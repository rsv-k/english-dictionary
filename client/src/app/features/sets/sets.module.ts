import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetsRoutingModule } from './sets-routing.module';
import { SetsComponent } from './pages/sets/sets.component';
import { SharedModule } from '@shared/shared.module';
import { SetComponent } from './components/set/set.component';


@NgModule({
   declarations: [SetsComponent, SetComponent],
   imports: [
      CommonModule,
      SetsRoutingModule,
      SharedModule
   ]
})
export class SetsModule { }
