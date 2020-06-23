import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { WordsResolver } from '@core/resolvers/words-resolver.service';

const routes: Routes = [
   {
      path: '',
      component: DictionaryComponent,
      resolve: { words: WordsResolver }
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class DictionaryRoutingModule {}
