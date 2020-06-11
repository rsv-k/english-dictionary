import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { WordTranslationComponent } from './pages/word-translation/word-translation.component';
import { GameProtectGuard } from '@core/guards/game-protect.guard';
import { TranslationWordComponent } from './pages/translation-word/translation-word.component';

const routes: Routes = [
   {
      path: '',
      component: LearnComponent,
   },
   {
      path: 'word-translation',
      component: WordTranslationComponent,
      canActivate: [ GameProtectGuard ]
   },
   {
      path: 'translation-word',
      component: TranslationWordComponent,
      canActivate: [ GameProtectGuard ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
