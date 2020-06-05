import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { WordTranslationWordComponent } from './pages/word-translation-word/word-translation-word.component';
import { SavannahComponent } from './pages/savannah/savannah.component';


const routes: Routes = [
   {
      path: '',
      component: LearnComponent,
      children: [
         {
            path: 'first',
            component: WordTranslationWordComponent
         },
         {
            path: 'second',
            component: SavannahComponent
         }
      ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
