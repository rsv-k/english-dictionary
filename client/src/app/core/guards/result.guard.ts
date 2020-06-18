import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class ResultGuard implements CanActivate {
   constructor(private router: Router) {}

   canActivate(): boolean {
      const currentNavigation = this.router.getCurrentNavigation().extras;
      const result =
         currentNavigation.state &&
         currentNavigation.state.gameName &&
         currentNavigation.state.result;
      if (result) {
         return true;
      }

      this.router.navigate(['/learn']);
   }
}
