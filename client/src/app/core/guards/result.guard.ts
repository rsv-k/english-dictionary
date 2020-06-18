import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class ResultGuard implements CanActivate {
   constructor(private router: Router) {}

   canActivate(): boolean {
      const result =
         window.history.state &&
         window.history.state.gameName &&
         window.history.state.result;
      if (result) {
         return window.history.state.gameName && window.history.state.result;
      }

      this.router.navigate(['/learn']);
   }
}
