import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
   exports: [
      MatExpansionModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatAutocompleteModule,
      MatIconModule,
      MatToolbarModule
   ]
})
export class MaterialModule { }
