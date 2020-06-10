import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word } from '@core/models/word.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LearnService } from '@core/services/learn.service';

@Component({
   selector: 'app-learn',
   templateUrl: './learn.component.html',
   styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
   titles: string[] = [
      'Word-translation',
      'Translation-word',
      'Savannah',
      'Word constructor',
      'Listening',
      'Word cards'
   ];

   wordsToLearn = {};
   subscription: Subscription;

   constructor(
      private learnService: LearnService,
      private router: Router
      ) { }

   ngOnInit() {
      this.subscription = this.learnService.getQuantities()
         .subscribe(data => {
            const values = Object.values(data.result);
            for (let i = 0; i < values.length; i++) {
               this.wordsToLearn[i + 1] = values[i];
            }
         });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   onNavigate(index: number) {
      const url = '/learn/' + this.titles[index].toLowerCase();

      this.router.navigate([url]);
   }
}
