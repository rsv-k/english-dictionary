import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SetService } from '@core/services/set.service';
import { Set } from '@core/models/set.model';
import { first } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class SetsResolver implements Resolve<Set[]> {
   constructor(private setService: SetService) {}

   resolve(): Observable<Set[]> {
      this.setService.getSets();
      return this.setService.setsUpdateListener$.pipe(first());
   }
}
