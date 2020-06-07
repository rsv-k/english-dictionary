import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnRoutingModule } from './learn-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LearnComponent } from './pages/learn/learn.component';
import { LearnGameCardComponent } from './components/learn-game-card/learn-game-card.component';


@NgModule({
   declarations: [LearnComponent, LearnGameCardComponent],
   imports: [
      CommonModule,
      LearnRoutingModule,
      SharedModule
   ]
})
export class LearnModule { }
