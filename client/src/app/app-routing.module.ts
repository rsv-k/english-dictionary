import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

const routes: Routes = [
   { path: '', redirectTo: '/dictionary', pathMatch: 'full' },
   {
      path: 'dictionary',
      canActivate: [AuthGuard],
      loadChildren: () =>
         import('@features/dictionary/dictionary.module').then(
            m => m.DictionaryModule
         )
   },
   {
      path: 'set/:setName/:id',
      canActivate: [AuthGuard],
      loadChildren: () =>
         import('@features/dictionary/dictionary.module').then(
            m => m.DictionaryModule
         )
   },
   {
      path: 'sets',
      canActivate: [AuthGuard],
      loadChildren: () =>
         import('@features/sets/sets.module').then(m => m.SetsModule)
   },
   {
      path: 'learn',
      canActivate: [AuthGuard],
      loadChildren: () =>
         import('@features/learn/learn.module').then(m => m.LearnModule)
   },
   {
      path: 'auth',
      canActivate: [NoAuthGuard],
      loadChildren: () =>
         import('@features/auth/auth.module').then(m => m.AuthModule)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}
