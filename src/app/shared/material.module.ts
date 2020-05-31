import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';



@NgModule({
   exports: [
      MatExpansionModule,
      MatCardModule
   ]
})
export class MaterialModule { }
