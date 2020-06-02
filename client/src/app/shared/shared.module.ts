import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CutLengthPipe } from './pipes/cut-length.pipe';



@NgModule({
   declarations: [CutLengthPipe],
   imports: [
      CommonModule,
      MaterialModule
   ],
   exports: [
      CutLengthPipe,
      MaterialModule
   ]
})
export class SharedModule { }
