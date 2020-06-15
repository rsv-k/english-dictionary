import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   { path: '', redirectTo: '/dictionary', pathMatch: 'full' },
   { path: 'dictionary', loadChildren: () => import('@features/dictionary/dictionary.module').then(m => m.DictionaryModule) },
   { path: 'set/:setName/:id', loadChildren: () => import('@features/dictionary/dictionary.module').then(m => m.DictionaryModule) },
   { path: 'sets', loadChildren: () => import('@features/sets/sets.module').then(m => m.SetsModule) },
   { path: 'learn', loadChildren: () => import('@features/learn/learn.module').then(m => m.LearnModule) },
   { path: 'auth', loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
