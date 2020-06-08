import { Injectable } from '@angular/core';
import { Set } from '@core/models/set.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';

const BACKEND_URL = environment.apiUrl + 'set';

@Injectable({
   providedIn: 'root'
})
export class SetService {
   private sets$ = new BehaviorSubject<Set[]>([]);
   sets: Set[] = [];

   constructor(
      private http: HttpClient,
      private utilsService: UtilsService
      ) { }


   getSetsUpdateListener() {
      return this.sets$.asObservable();
   }

   getSets() {
      this.sets$.next([...this.sets]);
      this.http.get<{msg: string, sets: any}>(BACKEND_URL)
         .pipe(
            map(this.utilsService.changeIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('GET', sets);
         });
   }

   addSet(set: Set) {
      this.http.post<{msg: string, sets: any}>(BACKEND_URL, { set })
         .pipe(
            map(this.utilsService.changeIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('ADD', sets);
         });
   }

   deleteSet(id: string) {
      this.http.delete<{msg: string, sets: any}>(BACKEND_URL + '/' + id)
         .pipe(
            map(this.utilsService.changeIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('DELETE', sets);
         });
   }

   editSet(set: Set) {
      this.http.put<{msg: string, sets: any}>(BACKEND_URL, { set })
         .pipe(
            map(this.utilsService.changeIdField)
         )
         .subscribe((sets: Set[]) => {
            this.updateSets('EDIT', sets);
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
         case 'EDIT':
            this.sets = this.sets.map(set => {
               if (set.id === sets[0].id) {
                  return sets[0];
               }

               return set;
            });
            break;
      }

      if (operation !== 'GET') {
         let action = operation.toLowerCase();
         action += action[action.length - 1] === 'e' ? 'd' : 'ed';

         this.utilsService.showSnackBar('Set ' + action);
      }
      this.sets$.next([...this.sets]);
   }
}
