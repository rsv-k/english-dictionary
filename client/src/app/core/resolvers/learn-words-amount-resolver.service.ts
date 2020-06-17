import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LearnService } from '@core/services/learn.service';

@Injectable({
   providedIn: 'root'
})
export class LearnWordsAmountResolver implements Resolve<string[]> {
   constructor(private learnService: LearnService) {}

   resolve(): Observable<string[]> {
      return this.learnService.getQuantities();
   }
}
