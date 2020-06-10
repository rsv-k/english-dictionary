import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LearnService } from '@core/services/learn.service';

@Component({
   selector: 'app-learn',
   templateUrl: './learn.component.html',
   styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
   titles: string[];

   wordsQuantities$: Observable<string[]>;

   constructor(
      private learnService: LearnService,
      ) { }

   ngOnInit() {
      this.titles = this.learnService.getAvailableGames();
      this.wordsQuantities$ = this.learnService.getQuantities();
   }
}
