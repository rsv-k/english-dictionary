import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
   declarations: [HeaderComponent],
   imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      RouterModule
   ],
   exports: [
      HeaderComponent
   ]
})
export class CoreModule { }
