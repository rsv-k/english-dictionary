import { Injectable } from '@angular/core';
import { Set } from '@core/models/set.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class SetService {
   private sets$ = new BehaviorSubject<Set[]>([]);
   sets: Set[] = [
      { title: 'Animals' },
      { title: 'Family' },
      { title: 'Environment' }
   ];

   getSetsUpdateListener() {
      return this.sets$.asObservable();
   }

   getSets() {
      this.sets$.next([...this.sets]);
   }

   addSet(set: Set) {
      this.sets.push(set);
      this.sets$.next([...this.sets]);
   }

   constructor() { }
}
