import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UtilsService } from './utils.service';
import { filter, map } from 'rxjs/operators';
import { Word } from '@core/models/word.model';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'learn';

@Injectable({
   providedIn: 'root'
})
export class LearnService {
   private wordsToLearn: Word[];
   private words = new Subject<Word[]>();
   wordsUpdateListener$ = this.words.asObservable();
   private randomOptions = new Subject<string[][] | string[]>();
   randomOptionsUpdateListener$ = this.randomOptions.asObservable();

   constructor(
      private http: HttpClient,
      private utilsService: UtilsService
      ) { }

   getAvailableGames(): string[] {
      return [
         'Word-translation',
         'Translation-word',
         'Savannah',
         'Word constructor',
         'Listening',
         'Word cards'
      ];
   }

   toggleLearnings(ids: string[], reverse: boolean, gameNumber: number, option: boolean) {
      this.http.post(BACKEND_URL, { ids, reverse, gameNumber, option })
         .subscribe(() => {
            this.utilsService.showSnackBar('Words sent to learn');
         });
   }

   getWordsToLearn(fetchAllWords?: boolean, fetchWordsForm?: number) {
      const queries = {
         params: new HttpParams()
      };
      if (fetchAllWords) {
         queries.params = queries.params.set('all', fetchAllWords + '');
      }

      if (fetchWordsForm) {
         queries.params = queries.params.set('fetchFrom', fetchWordsForm + '');
      }


      this.http.get<{msg: string, result: any}>(BACKEND_URL, queries)
         .pipe(
            filter(data => data.result[0] !== null),
            map(this.utilsService.changeIdField),
            map(this.utilsService.setDefaultPic)
         )
         .subscribe((words: Word[]) => {
            this.wordsToLearn = words;
            this.words.next([...this.wordsToLearn]);
         });
   }

   getRandomOptions(except: string[] | string, property: string) {
      this.http.post<{ msg: string, options: any}>(BACKEND_URL + '/randomOptions', { except, property })
         .pipe(
            map(data => data.options),
            map((options) => {
               if (Array.isArray(options[0])) {
                  return options.map(option => option.join(','));
               }

               return options;
            })
         )
         .subscribe((options: string[]) => {
            this.randomOptions.next(options);
         });
   }

   getQuantities() {
      return this.http.get<{ msg: string, result: any[]}>(BACKEND_URL + '/quantity')
         .pipe(
            map(data => Object.values(data.result)),
         );
   }
}
