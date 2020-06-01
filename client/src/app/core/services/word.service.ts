import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'word';

@Injectable({
   providedIn: 'root'
})
export class WordService {
   words$ = new BehaviorSubject<Word[]>([]);
   private words: Word[];

   constructor(private http: HttpClient) { }

   getWordsUpdateListener() {
      return this.words$.asObservable();
   }

   getWords() {
      this.http.get<{msg: string, words: any}>(BACKEND_URL)
         .pipe(
            map(this.replaceWordIdField)
         )
         .subscribe((words: Word[]) => {
            this.updateWords('GET', words);
         });
   }

   addWord(word: Word) {
      let operation = '';
      this.getSpecificWord(word.english)
         .pipe(
            switchMap((words: Word) => {
               if (words[0] && words[0].english) {
                  operation = 'EDIT';
                  words[0].russian.push(word.russian.pop());
                  return this.editWord(words[0]);
               } else {
                  operation = 'ADD';
                  return this.createWord(word);
               }
            })
         )
         .subscribe((words: Word[]) => {
            this.updateWords(operation, words);
         });
   }

   editWord(word: Word) {
      return this.http.put<{msg: string, words: any}>(BACKEND_URL, { word })
         .pipe(
            map(this.replaceWordIdField)
         );
   }

   createWord(word: Word) {
      return this.http.post<{msg: string, words: any}>(BACKEND_URL, { word })
         .pipe(
            map(this.replaceWordIdField)
         );
   }

   deleteWord(id: string) {
      this.http.delete<{msg: string, words: any}>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.replaceWordIdField)
         )
         .subscribe((words: Word[]) => {
            this.updateWords('DELETE', words);
         });
   }

   showTranslations(word: Observable<string>) {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         switchMap(w => this.getTranslations(w))
      );
   }

   private getSpecificWord(word: string) {
      return this.http.get<{msg: string, word: any}>(BACKEND_URL + '/' + word)
         .pipe(
            map(this.replaceWordIdField)
         );
   }

   private getTranslations(word) {
      if (word.trim().length === 0) {
         return of([]);
      }

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

   private replaceWordIdField(data) {
      if (data.words[0] === null) {
         return [];
      }

      return data.words.map(obj => {
         obj.id = obj._id;
         delete obj._id;
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
      this.words$.next([...this.words]);
   }
}
