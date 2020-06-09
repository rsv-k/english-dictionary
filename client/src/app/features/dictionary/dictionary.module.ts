import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { WordComponent } from './components/word/word.component';
import { SharedModule } from '@shared/shared.module';
import { WordCreateComponent } from './components/word-create/word-create.component';
import { WordEditComponent } from './components/word-edit/word-edit.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [DictionaryComponent, WordComponent, WordCreateComponent, WordEditComponent],
  imports: [
      CommonModule,
      DictionaryRoutingModule,
      FormsModule,
      SharedModule,
      InfiniteScrollModule
  ]
})
export class DictionaryModule { }
