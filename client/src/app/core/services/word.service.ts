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
   words: Word[];

   constructor(private http: HttpClient) { }

   getWordsUpdateListener() {
      return this.words$.asObservable();
   }

   getWords() {
      this.http.get<{msg: string, words: any}>(BACKEND_URL)
         .pipe(
            map(data => {
               return data.words.map(word => {
                  word.id = word._id;
                  delete word._id;
                  return word;
               });
            })
         )
         .subscribe((words: Word[]) => {
            this.words = words;
            this.words$.next([...this.words]);
         });
   }

   addWord(word: Word) {
      this.http.post<{msg: string, word: any}>(BACKEND_URL, { word })
         .pipe(
            map(data => {
               data.word.id = data.word._id;
               delete data.word._id;
               return data.word;
            })
         )
         .subscribe((w: Word) => {
            this.words = [w, ...this.words];
            this.words$.next([...this.words]);
         });
   }

   deleteWord(id: string) {
      this.http.delete<{msg: string}>(BACKEND_URL + '/' + id)
         .subscribe(() => {
            this.words = this.words.filter(word => word.id !== id);
            this.words$.next([...this.words]);
         });
   }

   showTranslations(word: Observable<string>) {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         switchMap(w => this.getTranslations(w))
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
}
