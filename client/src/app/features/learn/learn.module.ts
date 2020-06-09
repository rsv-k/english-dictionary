import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LearnComponent } from './pages/learn/learn.component';
import { LearnGameCardComponent } from './components/learn-game-card/learn-game-card.component';
import { WordTranslationComponent } from './pages/word-translation/word-translation.component';
import { ResultsComponent } from './components/results/results.component';


@NgModule({
   declarations: [LearnComponent, LearnGameCardComponent, WordTranslationComponent, ResultsComponent],
   imports: [
      CommonModule,
      LearnRoutingModule,
      SharedModule
   ]
})
export class LearnModule { }
