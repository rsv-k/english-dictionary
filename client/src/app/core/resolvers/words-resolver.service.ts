import { Injectable } from '@angular/core';
import {
   Resolve,
   ActivatedRouteSnapshot,
   RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { WordService } from '@core/services/word.service';
import { Word } from '@core/models/word.model';

@Injectable({
   providedIn: 'root'
})
export class WordsResolver implements Resolve<Word[] | { title: Date }[]> {
   constructor(private wordService: WordService) {}

   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): Observable<Word[] | { title: Date }[]> {
      const setId = route.paramMap.get('id');

      const options = {
         setId
      };
      this.wordService.emptyWords();

      this.wordService.getWords(options);
      return this.wordService.wordsUpdateListener$.pipe(
         first(),
         map(words => {
            const newArr = [];
            const addedDates = {};

            for (const word of words) {
               const date = new Date(word.createdAt);
               const shortDate =
                  date.getDate() +
                  '-' +
                  date.getMonth() +
                  '-' +
                  date.getFullYear();
               if (!addedDates[shortDate]) {
                  newArr.push({
                     title: new Date(word.createdAt)
                  });
                  addedDates[shortDate] = true;
               }

               newArr.push(word);
            }

            return newArr;
         })
      );
   }
}
