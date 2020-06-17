import { Component, OnInit } from '@angular/core';
import { Set } from '@core/models/set.model';
import { Observable } from 'rxjs';
import { SetService } from '@core/services/set.service';
import { AuthService } from '@core/services/auth.service';

@Component({
   selector: 'app-sets',
   templateUrl: './sets.component.html',
   styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
   sets$: Observable<Set[]>;

   constructor(
      private setService: SetService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.sets$ = this.setService.setsUpdateListener$;
      this.setService.getSets();
   }

   onCreateSet(title: string) {
      const set: Set = {
         title: title[0].toUpperCase() + title.slice(1).toLowerCase(),
         ownerId: this.authService.userId
      };

      this.setService.addSet(set);
   }
}
