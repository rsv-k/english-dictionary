import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './pages/learn/learn.component';
import { WordTranslationWordComponent } from './components/word-translation-word/word-translation-word.component';


@NgModule({
  declarations: [LearnComponent, WordTranslationWordComponent],
  imports: [
    CommonModule,
    LearnRoutingModule
  ]
})
export class LearnModule { }
