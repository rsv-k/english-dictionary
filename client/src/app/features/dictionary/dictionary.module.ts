import { NgModule } from '@angular/core';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { WordComponent } from './components/word/word.component';
import { SharedModule } from '@shared/shared.module';
import { WordCreateComponent } from './components/word-create/word-create.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManageWordsComponent } from './components/manage-words/manage-words.component';

@NgModule({
   declarations: [
      DictionaryComponent,
      WordComponent,
      WordCreateComponent,
      WordEditComponent,
      ManageWordsComponent
   ],
   imports: [DictionaryRoutingModule, SharedModule, InfiniteScrollModule]
})
export class DictionaryModule {}
