import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetsComponent } from './pages/sets/sets.component';


const routes: Routes = [
   { path: '', component: SetsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule { }
