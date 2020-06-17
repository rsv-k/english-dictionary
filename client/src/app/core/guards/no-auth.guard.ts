import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(): Observable<boolean> {
      return this.authService.authStatusListener$.pipe(
         tap(isAuth => {
            if (isAuth) {
               this.router.navigate(['/dictionary']);
            }
         }),
         map(isAuth => !isAuth)
      );
   }
}
