import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { GameProtectGuard } from '@core/guards/game-protect.guard';
import { SavannahComponent } from './pages/savannah/savannah.component';
import { WordTranslationWordComponent } from './pages/word-translation-word/word-translation-word.component';
import { WordConstructorComponent } from './pages/word-constructor/word-constructor.component';
import { ListeningComponent } from './pages/listening/listening.component';
import { WordCardsComponent } from './pages/word-cards/word-cards.component';
import { LearnWordsAmountResolver } from '@core/resolvers/learn-words-amount-resolver.service';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
   {
      path: '',
      component: LearnComponent,
      resolve: { quantities: LearnWordsAmountResolver }
   },
   {
      path: 'word-translation',
      component: WordTranslationWordComponent,
      canActivate: [GameProtectGuard],
      data: { gameName: 'word-translation' }
   },
   {
      path: 'translation-word',
      component: WordTranslationWordComponent,
      canActivate: [GameProtectGuard],
      data: { gameName: 'translation-word' }
   },
   {
      path: 'savannah',
      component: SavannahComponent,
      canActivate: [GameProtectGuard]
   },
   {
      path: 'word_constructor',
      component: WordConstructorComponent,
      canActivate: [GameProtectGuard]
   },
   {
      path: 'listening',
      component: ListeningComponent,
      canActivate: [GameProtectGuard]
   },
   {
      path: 'word_cards',
      component: WordCardsComponent,
      canActivate: [GameProtectGuard]
   },
   {
      path: 'result',
      component: ResultsComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LearnRoutingModule {}
