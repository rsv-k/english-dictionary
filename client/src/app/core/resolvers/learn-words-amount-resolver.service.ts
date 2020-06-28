import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { SetService } from '@core/services/set.service';
import { Set } from '@core/models/set.model';
import { switchMap, first } from 'rxjs/operators';

interface Data {
   quantities: string[];
   sets: Set[];
}

@Injectable({
   providedIn: 'root'
})
export class LearnWordsAmountResolver implements Resolve<Data> {
   constructor(
      private learnService: LearnService,
      private setService: SetService
   ) {}

   resolve(): Observable<Data> {
      return this.learnService.getQuantities().pipe(
         switchMap((quantities: string[]) => {
            this.setService.getSets();
            return forkJoin({
               quantities: of(quantities),
               sets: this.setService.setsUpdateListener$.pipe(first())
            });
         })
      );
   }
}
