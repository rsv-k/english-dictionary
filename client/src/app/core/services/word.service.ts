import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, distinctUntilChanged, debounceTime, switchMap, filter, tap } from 'rxjs/operators';
import { of, Subject, iif } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

const BACKEND_URL = environment.apiUrl + 'word';
const DEFAULT_PIC = 'https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png';

@Injectable({
   providedIn: 'root'
})
export class WordService {
   private wordsUpdateListener = new Subject<Word[]>();
   private words: Word[];

   wordsUpdateListener$ = this.wordsUpdateListener.asObservable();

   constructor(
      private http: HttpClient,
      private utilsService: UtilsService
      ) { }

   getWords(setId?: string, startsWith?: string) {
      const options = {
         params: new HttpParams()
      };

      if (setId) {
         options.params = options.params.set('setId', setId);
      }

      if (startsWith) {
         options.params = options.params.set('startsWith', startsWith);
      }

      this.http.get<{msg: string, words: any}>(BACKEND_URL, options)
         .pipe(
            filter(data => data.words[0] !== null),
            map(this.mutateIdAndPic),
            tap((words: Word[]) => this.updateWords('GET', words))
         )
         .subscribe(() => {
         });
   }

   addWord(word: Word) {
      this.getSpecificWord(word.english)
         .pipe(
            switchMap((words: Word[]) => {
               if (words.length) {
                  words[0].russian.push(word.russian.pop());
                  return this.editWord(words[0]);
               } else {
                  return this.createWord(word);
               }
            })
         )
         .subscribe(() => {
         });
   }

   editWord(word: Word) {
      return this.http.put<{msg: string, words: any}>(BACKEND_URL, { word })
         .pipe(
            map(this.mutateIdAndPic),
            tap((words: Word[]) => this.updateWords('EDIT', words))
         );
   }

   createWord(word: Word) {
      return this.http.post<{msg: string, words: any}>(BACKEND_URL, { word })
         .pipe(
            map(this.mutateIdAndPic),
            tap((words: Word[]) => this.updateWords('ADD', words))
         );
   }

   deleteWord(id: string) {
      this.http.delete<{msg: string, words: any}>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.mutateIdAndPic),
            tap((words: Word[]) => this.updateWords('DELETE', words))
         )
         .subscribe(() => {
         });
   }

   deleteManyWords(ids: string[], reverse?: boolean) {
      this.http.post(BACKEND_URL + '/deleteMany', { ids, reverse })
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
      let setId = '';
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         map(w => {
            const text = w.split('---');
            const str = text[text.length > 1 ? 1 : 0].split(' ').filter(s => s.trim().length !== 0).join(' ');
            if (text.length > 1) {
               setId = text[0];
               return str;
            }

            return str;
         }),
         tap((w) => this.getWords(setId, w)),
         switchMap(w => iif(() => w.trim().length === 0, of([]), this.getTranslations(w)))
      );
   }

   private getSpecificWord(word: string) {
      return this.http.get<{msg: string, words: any}>(BACKEND_URL + '/' + word)
         .pipe(
            map(data => {
               if (data.words[0] === null) {
                  data.words = [];
               }

               return data;
            }),
            map(this.mutateIdAndPic),
         );
   }

   private getTranslations(word) {
      const url = BACKEND_URL + '/translations/' + word;
      return this.http.get<{msg: string, result: any}>(url)
      .pipe(
         map(data => {
            return data.result.translate.map(translation => {
               return {
                  pic_url: translation.pic_url,
                  value: translation.value,
                  origin: data.result.word,
                  sound_url: data.result.sound_url,
                  transcription: data.result.transcription
               };
            });
         }),
      );
   }

   private mutateIdAndPic(data) {
      return data.words.map(obj => {
         obj.id = obj._id;
         delete obj._id;
         obj.pic_url = obj.pic_url ? obj.pic_url : DEFAULT_PIC;
         return obj;
      });
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
            this.words = this.words.map(word => {
               if (word.id === words[0].id) {
                  return words[0];
               }

               return word;
            });
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
