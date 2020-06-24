import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CutLengthPipe } from './pipes/cut-length.pipe';
import { CenteredProjectionComponent } from './components/centered-projection/centered-projection.component';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [CutLengthPipe, CenteredProjectionComponent],
   imports: [CommonModule, MaterialModule],
   exports: [
      CutLengthPipe,
      MaterialModule,
      CenteredProjectionComponent,
      CommonModule,
      FormsModule
   ]
})
export class SharedModule {}
