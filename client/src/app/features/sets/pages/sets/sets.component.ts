import { Component, OnInit } from '@angular/core';
import { Set } from '@core/models/set.model';
import { Observable } from 'rxjs';
import { SetService } from '@core/services/set.service';

@Component({
   selector: 'app-sets',
   templateUrl: './sets.component.html',
   styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
   sets$: Observable<Set[]>;

   constructor(
      private setService: SetService,
      ) { }

   ngOnInit(): void {
      this.sets$ = this.setService.getSetsUpdateListener();
      this.setService.getSets();
   }

   onCreateSet(title: string) {
      const set: Set = {
         title: title[0].toUpperCase() + title.slice(1).toLowerCase()
      };

      this.setService.addSet(set);
   }

}
