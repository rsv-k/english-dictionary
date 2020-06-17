import { Component, OnInit } from '@angular/core';
import { LearnService } from '@core/services/learn.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

interface Game {
   title: string;
   wordsQuantity: number;
}

@Component({
   selector: 'app-learn',
   templateUrl: './learn.component.html',
   styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
   games: Game[] = [];

   constructor(
      private learnService: LearnService,
      private route: ActivatedRoute,
      private router: Router
   ) {}

   ngOnInit() {
      this.route.data.subscribe((data: Data) => {
         const titles = this.learnService.getAvailableGames();

         for (let i = 0; i < data.quantities.length; i++) {
            this.games.push({
               title: titles[i],
               wordsQuantity: data.quantities[i]
            });
         }
      });
   }

   onNavigate(game: Game) {
      const destination = game.title
         .split(' ')
         .join('_')
         .toLowerCase();
      this.router.navigate(['/learn/' + destination]);
   }
}
