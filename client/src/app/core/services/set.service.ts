import { Injectable } from '@angular/core';
import { Set } from '@core/models/set.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';

const BACKEND_URL = '/api/set';

@Injectable({
   providedIn: 'root'
})
export class SetService {
   private sets$ = new Subject<Set[]>();
   setsUpdateListener$ = this.sets$.asObservable();
   sets: Set[] = [];

   constructor(private http: HttpClient, private utilsService: UtilsService) {}

   getSets() {
      this.http
         .get<{ msg: string; sets: any }>(BACKEND_URL)
         .pipe(map(this.utilsService.changeIdField))
         .subscribe(sets => this.updateSets('GET', sets));
   }

   addSet(set: Set) {
      this.http
         .post<{ msg: string; sets: any }>(BACKEND_URL, { set })
         .pipe(map(this.utilsService.changeIdField))
         .subscribe((sets: Set[]) => {
            this.updateSets('ADD', sets);
         });
   }

   deleteSet(id: string) {
      this.http
         .delete<{ msg: string; sets: any }>(BACKEND_URL + '/' + id)
         .pipe(map(this.utilsService.changeIdField))
         .subscribe((sets: Set[]) => {
            this.updateSets('DELETE', sets);
         });
   }

   editSet(set: Set) {
      this.http
         .put<{ msg: string; sets: any }>(BACKEND_URL, { set })
         .pipe(map(this.utilsService.changeIdField))
         .subscribe((sets: Set[]) => {
            this.updateSets('EDIT', sets);
         });
   }

   addWordsToSet(setId: string, ids: string[], reverse: boolean) {
      this.http
         .put(BACKEND_URL + '/addToSet', { setId, ids, reverse })
         .subscribe();
   }

   private updateSets(operation: string, sets: Set[]) {
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
            this.sets = this.sets.map(set =>
               set.id === sets[0].id ? sets[0] : set
            );
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
