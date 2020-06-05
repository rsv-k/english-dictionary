import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './pages/learn/learn.component';
import { WordTranslationWordComponent } from './components/word-translation-word/word-translation-word.component';
import { SharedModule } from '@shared/shared.module';
import { SavannahComponent } from './pages/savannah/savannah.component';


@NgModule({
   declarations: [LearnComponent, WordTranslationWordComponent, SavannahComponent],
   imports: [
      CommonModule,
      LearnRoutingModule,
      SharedModule
   ]
})
export class LearnModule { }
