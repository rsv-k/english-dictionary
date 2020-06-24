import { NgModule } from '@angular/core';

import { LearnRoutingModule } from './learn-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LearnComponent } from './pages/learn/learn.component';
import { LearnGameCardComponent } from './components/learn-game-card/learn-game-card.component';
import { ResultsComponent } from './pages/results/results.component';
import { SavannahComponent } from './pages/savannah/savannah.component';
import { WordTranslationWordComponent } from './pages/word-translation-word/word-translation-word.component';
import { WordConstructorComponent } from './pages/word-constructor/word-constructor.component';
import { ListeningComponent } from './pages/listening/listening.component';
import { WordCardsComponent } from './pages/word-cards/word-cards.component';
import { LearnWordsAmountResolver } from '@core/resolvers/learn-words-amount-resolver.service';

@NgModule({
   declarations: [
      LearnComponent,
      LearnGameCardComponent,
      ResultsComponent,
      SavannahComponent,
      WordTranslationWordComponent,
      WordConstructorComponent,
      ListeningComponent,
      WordCardsComponent
   ],
   imports: [LearnRoutingModule, SharedModule],
   providers: [LearnWordsAmountResolver]
})
export class LearnModule {}
