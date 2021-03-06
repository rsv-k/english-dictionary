import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(): Observable<boolean> {
      return this.authService.authStatusListener$.pipe(
         tap(res => {
            if (!res) {
               this.router.navigate(['/auth/login']);
            }
         })
      );
   }
}
