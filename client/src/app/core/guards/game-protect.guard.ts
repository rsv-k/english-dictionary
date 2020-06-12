import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LearnService } from '@core/services/learn.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameProtectGuard implements CanActivate {
   constructor(private learnService: LearnService, private router: Router) {}
   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      let gameName = state.url.split('/')[2].split('_').join(' ');
      gameName = gameName[0].toUpperCase() + gameName.slice(1).toLowerCase();
      const games = this.learnService.getAvailableGames();
      const gameIndex = games.findIndex(game => game === gameName);

      return this.learnService.getQuantities()
         .pipe(
            map(quantities => !!quantities[gameIndex]),
            tap(result => {
               if (!result) {
                  this.router.navigate(['/learn']);
               }
            })
         );
   }
}
