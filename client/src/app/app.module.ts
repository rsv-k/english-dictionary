import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';

import {
   SocialLoginModule,
   SocialAuthServiceConfig
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      CoreModule,
      SocialLoginModule
   ],
   providers: [
      {
         provide: 'SocialAuthServiceConfig',
         useValue: {
            autoLogin: false,
            providers: [
               {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                     '489399788360-lgve4u69it8cru0r0f761gr64m1glpu3.apps.googleusercontent.com'
                  )
               }
            ]
         } as SocialAuthServiceConfig
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}
