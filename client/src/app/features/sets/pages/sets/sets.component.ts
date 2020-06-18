import { Component, OnInit } from '@angular/core';
import { Set } from '@core/models/set.model';
import { SetService } from '@core/services/set.service';
import { AuthService } from '@core/services/auth.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
   selector: 'app-sets',
   templateUrl: './sets.component.html',
   styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
   sets: Set[];

   constructor(
      private setService: SetService,
      private authService: AuthService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.route.data.subscribe((data: Data) => {
         this.sets = data.sets;
      });
   }

   onCreateSet(title: string) {
      const set: Set = {
         title: title[0].toUpperCase() + title.slice(1).toLowerCase(),
         ownerId: this.authService.userId
      };

      this.setService.addSet(set);
   }
}
