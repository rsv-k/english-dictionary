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
   private randomTranslations = new Subject<string[][]>();
   randomTranslationsUpdateListener$ = this.randomTranslations.asObservable();

   constructor(
      private http: HttpClient,
      private utilsService: UtilsService
      ) { }

   setToLearn(ids: string[], reverse: boolean, gameNumber: number) {
      this.http.post(BACKEND_URL, { ids, reverse, gameNumber })
         .subscribe(() => {
            this.utilsService.showSnackBar('Words sent to learn');
         });
   }

   getWordsToLearn(fetchAll?: boolean) {
      const queries = fetchAll ? { params: new HttpParams().set('all', fetchAll + '') } : {};

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

   getRandomTranslations(except: string[]) {
      this.http.post<{ msg: string, translations: any}>(BACKEND_URL + '/randomTranslations', { except })
         .pipe(
            map(data => data.translations)
         )
         .subscribe((translations: string[][]) => {
            this.randomTranslations.next(translations);
         });
   }
}
