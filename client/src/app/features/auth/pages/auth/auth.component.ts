import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   form: string;
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private socialAuthService: SocialAuthService
   ) {}

   ngOnInit(): void {
      this.route.url.subscribe(data => {
         this.form = data[0].path;
      });

      this.socialAuthService.authState.subscribe(user => {
         console.log(user);
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
