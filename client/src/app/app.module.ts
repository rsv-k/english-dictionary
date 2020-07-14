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
                     '489399788360-q3g1k2uq6tgeief4mr6nlphr9ngvicrp.apps.googleusercontent.com'
                  )
               }
            ]
         } as SocialAuthServiceConfig
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}
