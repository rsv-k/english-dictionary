import { Injectable } from '@angular/core';
import { Word } from '@core/models/word.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
   map,
   distinctUntilChanged,
   debounceTime,
   switchMap,
   tap
} from 'rxjs/operators';
import { of, Subject, forkJoin, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Translation } from '@core/models/translation.model';

const BACKEND_URL = '/api/word';
const DEFAULT_PIC =
   'https://contentcdn.lingualeo.com/uploads/upimages/0bbdd3793cb97ec4189557013fc4d6e4bed4f714.png';

interface Config {
   msg: string;
   result: any;
   wordsCount?: number;
}

@Injectable({
   providedIn: 'root'
})
export class WordService {
   private wordsCountUpdateListener = new BehaviorSubject<number>(0);
   private wordsCount = 0;
   wordsCount$ = this.wordsCountUpdateListener.asObservable();

   private wordsUpdateListener = new Subject<Word[]>();
   wordsUpdateListener$ = this.wordsUpdateListener.asObservable();
   private words: Word[] = [];

   constructor(private http: HttpClient, private utilsService: UtilsService) {}

   getWords(options: {
      setId?: string;
      startsWith?: string;
      startsFrom?: number;
      isCachingWords?: boolean;
   }) {
      const payload = {
         params: new HttpParams()
      };

      for (const option in options) {
         if (options[option]) {
            payload.params = payload.params.set(option, options[option]);
         }
      }

      this.http
         .get<Config>(BACKEND_URL, payload)
         .pipe(
            tap(data => {
               this.updateWordsCount(data.wordsCount);
            }),
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic)
         )
         .subscribe((words: Word[]) => {
            if (options.startsWith) {
               this.wordsUpdateListener.next([...words]);
               return;
            }

            this.words = [...this.words, ...words];
            this.updateWords('GET', this.words);
         });
   }

   emptyWords() {
      this.words = [];
   }

   editWord(word: Word) {
      if (word.pic_url === DEFAULT_PIC) {
         word.pic_url = null;
      }

      this.http
         .put<Config>(BACKEND_URL, { word })
         .pipe(
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic),
            tap((words: Word[]) => this.updateWords('EDIT', words))
         )
         .subscribe();
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
            tap((words: Word[]) => {
               this.updateWordsCount(this.wordsCount + 1);
               this.updateWords('ADD', words);
            })
         )
         .subscribe(() => {
            this.wordsCount += 1;
         });
   }

   deleteWord(id: string, setId: string) {
      let query = '';
      if (setId) {
         query = '?setId=' + setId;
      }

      this.http
         .delete<Config>(BACKEND_URL + '/' + id + query)
         .pipe(
            map(this.utilsService.changeIdField),
            tap((words: Word[]) => {
               this.updateWordsCount(this.wordsCount - 1);
               this.updateWords('DELETE', words);
            })
         )
         .subscribe(() => {});
   }

   deleteManyWords(setId: string, ids: string[], reverse?: boolean) {
      this.http
         .post(BACKEND_URL + '/deleteMany', { setId, ids, reverse })
         .subscribe(() => {
            this.wordsCount -= ids.length;
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

            this.updateWordsCount(this.wordsCount - ids.length);

            this.wordsUpdateListener.next([...this.words]);
            this.utilsService.showSnackBar('Words deleted');
         });
   }

   showTranslations(
      word: Observable<string>
   ): Observable<{ word: Word[]; translations: Translation[] }> {
      return word.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         switchMap(w =>
            forkJoin({
               translations:
                  w.trim().length === 0 ? of([]) : this.getTranslations(w),
               word: this.getSpecificWord(w)
            })
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

            if (this.words.findIndex(word => word.id === words[0].id) < 0) {
               const wordAfter = this.words.findIndex(word => {
                  const wordA = new Date(word.createdAt).getTime();
                  const wordB = new Date(words[0].createdAt).getTime();

                  return wordB - wordA > 0;
               });

               if (wordAfter >= 0) {
                  this.words.splice(wordAfter, 0, words[0]);
               } else if (this.words.length < 20) {
                  this.words.push(words[0]);
               }
            }

            break;
      }

      if (operation !== 'GET') {
         let action = operation.toLowerCase();
         action += action[action.length - 1] === 'e' ? 'd' : 'ed';

         this.utilsService.showSnackBar('Word ' + action);
      }
      this.wordsUpdateListener.next([...this.words]);
   }

   private updateWordsCount(count: number) {
      this.wordsCount = count;
      this.wordsCountUpdateListener.next(this.wordsCount);
   }
}
