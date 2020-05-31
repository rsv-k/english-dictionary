import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { WordComponent } from './components/word/word.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [DictionaryComponent, WordComponent],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    SharedModule
  ]
})
export class DictionaryModule { }
