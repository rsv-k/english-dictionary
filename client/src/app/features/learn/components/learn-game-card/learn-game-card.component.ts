import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-learn-game-card',
   templateUrl: './learn-game-card.component.html',
   styleUrls: ['./learn-game-card.component.scss']
})
export class LearnGameCardComponent {
   @Input() title: string;

   constructor() { }
}
