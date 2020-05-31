import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   { path: '', redirectTo: '/dictionary', pathMatch: 'full' },
   { path: 'dictionary', loadChildren: () => import('@features/dictionary/dictionary.module').then(m => m.DictionaryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
