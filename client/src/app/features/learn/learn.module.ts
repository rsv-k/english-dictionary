import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LearnComponent } from './pages/learn/learn.component';
import { LearnGameCardComponent } from './components/learn-game-card/learn-game-card.component';
import { ResultsComponent } from './components/results/results.component';
import { SavannahComponent } from './pages/savannah/savannah.component';
import { WordTranslationWordComponent } from './pages/word-translation-word/word-translation-word.component';


@NgModule({
   declarations: [LearnComponent, LearnGameCardComponent, ResultsComponent, SavannahComponent, WordTranslationWordComponent],
   imports: [
      CommonModule,
      LearnRoutingModule,
      SharedModule
   ]
})
export class LearnModule { }
