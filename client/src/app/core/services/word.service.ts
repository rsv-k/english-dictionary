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

interface Config {
   msg: string;
   result: any;
}

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

      this.http.get<Config>(BACKEND_URL, options)
         .pipe(
            filter(data => data.result[0] !== null),
            map(this.utilsService.changeIdField),
            map(this.setDefaultPic),
            tap((words: Word[]) => this.updateWords('GET', words))
         )
         .subscribe();
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
         .subscribe();
   }

   editWord(word: Word) {
      if (word.pic_url === DEFAULT_PIC) {
         word.pic_url = null;
      }

      return this.http.put<Config>(BACKEND_URL, { word })
         .pipe(
            map(this.utilsService.changeIdField),
            map(this.setDefaultPic),
            tap((words: Word[]) => this.updateWords('EDIT', words))
         );
   }

   createWord(word: Word) {
      if (word.pic_url === DEFAULT_PIC) {
         word.pic_url = null;
      }
      return this.http.post<Config>(BACKEND_URL, { word })
         .pipe(
            map(this.utilsService.changeIdField),
            map(this.setDefaultPic),
            tap((words: Word[]) => this.updateWords('ADD', words))
         );
   }

   deleteWord(id: string) {
      this.http.delete<Config>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.utilsService.changeIdField),
            tap((words: Word[]) => this.updateWords('DELETE', words))
         )
         .subscribe();
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

   setToLearn(ids: string[], reverse: boolean, gameNumber: number) {
      this.http.post(BACKEND_URL + '/setToLearn', { ids, reverse, gameNumber })
         .subscribe(() => {
            this.utilsService.showSnackBar('Words sent to learn');
         });
   }

   getWordsToLearn() {
      this.http.get<Config>(BACKEND_URL + '/wordsToLearn')
         .pipe(
            filter(data => data.result[0] !== null),
            map(this.utilsService.changeIdField),
            map(this.setDefaultPic)
         )
         .subscribe((words: Word[]) => {
            this.updateWords('GET', words)
         });
   }

   getRandomTranslations(translations: string[]): Observable<string[]> {
      return this.http.post<{ msg: string, translations: any}>(BACKEND_URL + '/randomTranslations', { translations })
         .pipe(
            map(data => data.translations)
         );
   }

   showTranslations(word: Observable<string>, setId: string) {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         tap((w) => this.getWords(setId, w)),
         switchMap(w => iif(() => w.trim().length === 0, of([]), this.getTranslations(w)))
      );
   }

   private getSpecificWord(word: string) {
      return this.http.get<{msg: string, result: any}>(BACKEND_URL + '/' + word)
         .pipe(
            map(data => {
               if (data.result[0] === null) {
                  data.result = [];
               }

               return data;
            }),
            map(this.utilsService.changeIdField),
         );
   }

   private getTranslations(word) {
      const url = BACKEND_URL + '/translations/' + word;
      return this.http.get<{msg: string, result: any}>(url)
      .pipe(
         map(data => {
            return data.result.translate.map(translation => {
               return {
                  pic_url: translation.pic_url || null,
                  value: translation.value,
                  origin: data.result.word,
                  sound_url: data.result.sound_url,
                  transcription: data.result.transcription
               };
            });
         }),
      );
   }

   private setDefaultPic(words: Word[]) {
      return words.map(word => {
         word.pic_url = word.pic_url ? word.pic_url : DEFAULT_PIC;
         return word;
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
            this.words = this.words.map(word => word.id === words[0].id ? words[0] : word);
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
