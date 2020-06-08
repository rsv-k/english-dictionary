import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {

   constructor(private snackBar: MatSnackBar) { }

   showSnackBar(msg: string) {
      this.snackBar.open(msg, null, { duration: 1500 });
   }

   changeIdField(data) {
      return data.result.map(obj => {
         obj.id = obj._id;
         delete obj._id;
         return obj;
      });
   }
}
