import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged, debounceTime, switchMap, filter, tap } from 'rxjs/operators';
import { of, BehaviorSubject, iif } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

const BACKEND_URL = environment.apiUrl + 'word';
const DEFAULT_PIC = 'https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png';

@Injectable({
   providedIn: 'root'
})
export class WordService {
   words$ = new BehaviorSubject<Word[]>([]);
   private words: Word[];

   constructor(
      private http: HttpClient,
      private utilsService: UtilsService
      ) { }

   getWordsUpdateListener() {
      return this.words$.asObservable();
   }

   getWords(setId: string = '') {
      let query = '';
      if (setId) {
         query = '?setId=' + setId;
      }

      this.http.get<{msg: string, words: any}>(BACKEND_URL + query)
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

   deleteManyWords(ids: string[]) {
      this.http.post(BACKEND_URL + '/deleteMany', { ids })
         .subscribe(() => {
            const deletedWords = {};

            ids.forEach(id => {
               deletedWords[id] = true;
            });

            this.words = this.words.filter(word => !deletedWords[word.id]);
            this.words$.next([...this.words]);
            this.utilsService.showSnackBar('Words deleted');
         });
   }

   showTranslations(word: Observable<string>) {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
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
                  origin: data.result.word
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
      this.words$.next([...this.words]);
   }
}
