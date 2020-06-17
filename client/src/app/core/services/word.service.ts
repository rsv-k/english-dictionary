import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
   map,
   distinctUntilChanged,
   debounceTime,
   switchMap,
   filter,
   tap
} from 'rxjs/operators';
import { of, Subject, iif } from 'rxjs';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

const BACKEND_URL = '/api/word';
const DEFAULT_PIC =
   'https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png';

interface Config {
   msg: string;
   result: any;
}

@Injectable({
   providedIn: 'root'
})
export class WordService {
   private wordsUpdateListener = new Subject<Word[]>();
   private words: Word[] = [];

   wordsUpdateListener$ = this.wordsUpdateListener.asObservable();

   constructor(private http: HttpClient, private utilsService: UtilsService) {}

   getWords(setId?: string, startsWith?: string, startsFrom?: number) {
      const options = {
         params: new HttpParams()
      };

      if (setId) {
         options.params = options.params.set('setId', setId);
      }

      if (startsWith) {
         options.params = options.params.set('startsWith', startsWith);
      }

      if (startsFrom) {
         options.params = options.params.set('startsFrom', startsFrom + '');
      }

      this.http
         .get<Config>(BACKEND_URL, options)
         .pipe(
            filter(data => !!data.result[0]),
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic),
            tap((words: Word[]) => {
               if (startsWith) {
                  this.wordsUpdateListener.next([...words]);
                  return;
               }

               if (this.words[0] && this.words[0].id === words[0].id) {
                  this.updateWords('GET', this.words);
                  return;
               }

               this.words = [...this.words, ...words];
               this.updateWords('GET', this.words);
            })
         )
         .subscribe();
   }

   emptyWords() {
      this.words = [];
   }

   addWord(word: Word) {
      this.getSpecificWord(word.english)
         .pipe(
            switchMap((words: Word[]) => {
               if (words.length) {
                  words[0].russian.push(word.russian.pop());
                  words[0].setId.push(word.setId.pop());
                  return this.editWord(words[0]);
               } else {
                  return this.createWord(word);
               }
            })
         )
         .subscribe();
   }

   editWord(word: Word) {
      if (word.pic_url === DEFAULT_PIC) {
         word.pic_url = null;
      }

      return this.http
         .put<Config>(BACKEND_URL, { word })
         .pipe(
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic),
            tap((words: Word[]) => this.updateWords('EDIT', words))
         );
   }

   createWord(word: Word) {
      if (word.pic_url === DEFAULT_PIC) {
         word.pic_url = null;
      }
      return this.http
         .post<Config>(BACKEND_URL, { word })
         .pipe(
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic),
            tap((words: Word[]) => this.updateWords('ADD', words))
         );
   }

   deleteWord(id: string) {
      this.http
         .delete<Config>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.utilsService.changeIdField),
            tap((words: Word[]) => this.updateWords('DELETE', words))
         )
         .subscribe();
   }

   deleteManyWords(setId: string, ids: string[], reverse?: boolean) {
      this.http
         .post(BACKEND_URL + '/deleteMany', { setId, ids, reverse })
         .subscribe(() => {
            const deletedWords = {};

            ids.forEach(id => {
               deletedWords[id] = true;
            });

            this.words = this.words.filter(word => {
               if (reverse) {
                  return deletedWords[word.id];
               }
               return !deletedWords[word.id];
            });

            this.wordsUpdateListener.next([...this.words]);
            this.utilsService.showSnackBar('Words deleted');
         });
   }

   showTranslations(word: Observable<string>) {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         switchMap(w =>
            iif(() => w.trim().length === 0, of([]), this.getTranslations(w))
         )
      );
   }

   private getSpecificWord(word: string) {
      return this.http
         .get<{ msg: string; result: any }>(BACKEND_URL + '/' + word)
         .pipe(
            map(data => {
               if (data.result[0] === null) {
                  data.result = [];
               }

               return data;
            }),
            map(this.utilsService.changeIdField)
         );
   }

   private getTranslations(word: string) {
      const url = BACKEND_URL + '/translations/' + word;
      return this.http.get<{ msg: string; result: any }>(url).pipe(
         map(data => {
            return data.result.translate.map(translation => {
               return {
                  pic_url: translation.pic_url || null,
                  value: translation.value,
                  sound_url: data.result.sound_url,
                  transcription: data.result.transcription
               };
            });
         })
      );
   }

   private updateWords(operation: string, words: Word[]) {
      switch (operation) {
         case 'ADD':
            this.words = [words[0], ...this.words];
            break;
         case 'GET':
            this.words = words;
            break;
         case 'DELETE':
            this.words = this.words.filter(word => word.id !== words[0].id);
            break;
         case 'EDIT':
            this.words = this.words.map(word =>
               word.id === words[0].id ? words[0] : word
            );
            break;
      }

      if (operation !== 'GET') {
         let action = operation.toLowerCase();
         action += action[action.length - 1] === 'e' ? 'd' : 'ed';

         this.utilsService.showSnackBar('Word ' + action);
      }
      this.wordsUpdateListener.next([...this.words]);
   }
}
