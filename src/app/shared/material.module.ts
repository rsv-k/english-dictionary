import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
   exports: [
      MatExpansionModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule
   ]
})
export class MaterialModule { }
