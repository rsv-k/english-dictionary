import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { switchMap, filter, catchError } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   error: string;
   form: string;
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private socialAuthService: SocialAuthService,
      private authService: AuthService
   ) {}

   ngOnInit(): void {
      this.route.url.subscribe(data => {
         this.form = data[0].path;
      });

      this.socialAuthService.authState
         .pipe(
            filter(profile => !!profile),
            switchMap(profile =>
               this.authService.googleAuth(profile).pipe(
                  catchError(err => {
                     this.error =
                        err.error.error.path === 'email'
                           ? 'User with such email already registered'
                           : 'Random error occured';
                     this.socialAuthService.signOut();
                     return of(null);
                  })
               )
            )
         )
         .subscribe(data => {
            if (data) {
               this.authService.initializeAuthState(data);
               this.router.navigate(['/dictionary']);
               this.socialAuthService.signOut();
            }
         });
   }

   signInWithGoogle() {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
   }

   onNavigate() {
      const where = this.form === 'signup' ? 'login' : 'signup';

      this.router.navigate([`/auth/${where}`]);
   }
}
