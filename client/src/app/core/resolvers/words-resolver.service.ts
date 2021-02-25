import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { WordService } from '@core/services/word.service';
import { Word } from '@core/models/word.model';
import { UtilsService } from '@core/services/utils.service';

@Injectable({
   providedIn: 'root'
})
export class WordsResolver implements Resolve<Word[] | { title: Date }[]> {
   constructor(
      private wordService: WordService,
      private utilsService: UtilsService
   ) {}

   resolve(
      route: ActivatedRouteSnapshot
   ): Observable<Word[] | { title: Date }[]> {
      const setId = route.paramMap.get('id');

      const options = {
         setId
      };
      this.wordService.emptyWords();

      this.wordService.getWords(options);
      return this.wordService.wordsUpdateListener$.pipe(
         first(),
         map(this.utilsService.addDateAmongWords)
      );
   }
}
