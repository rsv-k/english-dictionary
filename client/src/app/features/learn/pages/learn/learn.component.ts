import { Component, OnInit, OnDestroy } from '@angular/core';
import { LearnService } from '@core/services/learn.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Set } from '@core/models/set.model';
import { Subscription } from 'rxjs';

interface Game {
   title: string;
   wordsQuantity: number;
}

@Component({
   selector: 'app-learn',
   templateUrl: './learn.component.html',
   styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
   games: Game[] = [];
   sets: Set[];
   selectedSet: Set;

   private gamesSub: Subscription;
   constructor(
      private learnService: LearnService,
      private route: ActivatedRoute,
      private router: Router
   ) {}

   ngOnInit() {
      this.route.data.subscribe((data: Data) => {
         this.sets = [
            {
               title: 'All words'
            },
            ...data.data.sets
         ];

         this.setGames(data.data.quantities);
      });
   }

   onSelectionChange(value: string) {
      if (this.gamesSub) {
         this.gamesSub.unsubscribe();
      }

      const set = this.sets.find(s => s.title === value);
      this.selectedSet = set;

      this.learnService
         .getQuantities(set.id ? set.id : null)
         .subscribe((quantities: string[]) => {
            this.setGames(quantities);
         });
   }

   onNavigate(game: Game) {
      const destination = game.title
         .split(' ')
         .join('_')
         .toLowerCase();

      let queryParams = {};
      if (this.selectedSet && this.selectedSet.id) {
         queryParams = {
            setId: this.selectedSet.id
         };
      }

      this.router.navigate(['/learn/' + destination], {
         queryParams
      });
   }

   ngOnDestroy() {
      if (this.gamesSub) {
         this.gamesSub.unsubscribe();
      }
   }

   private setGames(quantities: string[]) {
      const titles = this.learnService.getAvailableGames();
      const games = [];

      for (let i = 0; i < quantities.length; i++) {
         games.push({
            title: titles[i],
            wordsQuantity: +quantities[i]
         });
      }

      this.games = games;
   }
}
