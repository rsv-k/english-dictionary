import { Component, OnInit, OnDestroy } from '@angular/core';
import { Set } from '@core/models/set.model';
import { SetService } from '@core/services/set.service';
import { AuthService } from '@core/services/auth.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';

@Component({
   selector: 'app-sets',
   templateUrl: './sets.component.html',
   styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit, OnDestroy {
   sets: Set[];

   private subscription: Subscription;
   constructor(
      private setService: SetService,
      private authService: AuthService,
      private route: ActivatedRoute,
      private utilsService: UtilsService
   ) {}

   ngOnInit(): void {
      this.route.data.subscribe((data: Data) => {
         this.sets = data.sets;
      });

      this.subscription = this.setService.setsUpdateListener$.subscribe(
         (sets: Set[]) => {
            this.sets = sets;
         }
      );
   }

   onCreateSet(title: string) {
      const set: Set = {
         title: title[0].toUpperCase() + title.slice(1).toLowerCase(),
         ownerId: this.authService.userId
      };

      if (!!this.sets.find(presentSet => presentSet.title === set.title)) {
         this.utilsService.showSnackBar('Set with such name already exists');
         return;
      }

      this.setService.addSet(set);
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
