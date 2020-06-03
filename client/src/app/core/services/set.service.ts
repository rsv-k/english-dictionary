import { Injectable } from '@angular/core';
import { Set } from '@core/models/set.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + 'set';

@Injectable({
   providedIn: 'root'
})
export class SetService {
   private sets$ = new BehaviorSubject<Set[]>([]);
   sets: Set[] = [];

   constructor(private http: HttpClient) { }


   getSetsUpdateListener() {
      return this.sets$.asObservable();
   }

   getSets() {
      this.sets$.next([...this.sets]);
      this.http.get<{msg: string, sets: any}>(BACKEND_URL)
         .pipe(
            map(this.replaceSetIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('GET', sets);
         });
   }

   addSet(set: Set) {
      this.http.post<{msg: string, sets: any}>(BACKEND_URL, { set })
         .pipe(
            map(this.replaceSetIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('ADD', sets);
         });
   }

   deleteSet(id: string) {
      this.http.delete<{msg: string, sets: any}>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.replaceSetIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('DELETE', sets);
         });
   }

   private replaceSetIdField(data) {
      return data.sets.map(set => {
         set.id = set._id;
         delete set._id;
         return set;
      });
   }

   private updateSets(operation, sets: Set[]) {
      switch (operation) {
         case 'ADD':
            this.sets.push(sets[0]);
            break;
         case 'GET':
            this.sets = sets;
            break;
         case 'DELETE':
            this.sets = this.sets.filter(set => set.id !== sets[0].id);
            break;
      }

      this.sets$.next([...this.sets]);
   }
}
