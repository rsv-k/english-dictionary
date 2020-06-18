import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetsComponent } from './pages/sets/sets.component';
import { SetsResolver } from '@core/resolvers/sets-resolver.service';

const routes: Routes = [
   { path: '', component: SetsComponent, resolve: { sets: SetsResolver } }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class SetsRoutingModule {}
