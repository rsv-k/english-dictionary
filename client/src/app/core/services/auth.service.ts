import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from '@core/models/authData.model';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private expiresInTimer = null;
   private authStatus = new BehaviorSubject<boolean>(false);
   authStatusListener$ = this.authStatus.asObservable();

   userId: string;
   accessToken: string;

   constructor(private http: HttpClient, private router: Router) {}

   signup(userModel: User) {
      this.http.post('/api/auth/signup', { user: userModel }).subscribe(() => {
         this.router.navigate(['/auth/login']);
      });
   }

   login(userModel: User) {
      return this.http
         .post<{ msg: string; result: AuthData }>('/api/auth/login', {
            user: userModel
         })
         .pipe(pluck('result'));
   }

   checkIfTaken(propertyName: string, propertyValue: string) {
      return this.http.post<{ isPresent: boolean }>('/api/auth/isTaken', {
         [propertyName]: propertyValue
      });
   }

   initializeAuthState(authData: AuthData) {
      this.authStatus.next(true);
      this.userId = authData.userId;
      this.accessToken = authData.accessToken;

      const accesTokenExpiresIn = authData.accessTokenExpiration;
      this.setTimeWhenAuthExpires(accesTokenExpiresIn);
      this.saveAuthData(authData);
   }

   autoAuthUser() {
      const authInformation = this.getAuthData();
      if (!authInformation) {
         return this.logout();
      }

      const now = new Date().getTime();
      const isAccessTokenValid = authInformation.accessTokenExpiration > now;
      const isRefreshTokenValid = authInformation.refreshTokenExpiration > now;

      if (isAccessTokenValid) {
         const authData: AuthData = {
            userId: authInformation.userId,
            accessToken: authInformation.accessToken,
            accessTokenExpiration:
               (authInformation.accessTokenExpiration - now) / 1000,
            refreshToken: authInformation.refreshToken,
            refreshTokenExpiration:
               (authInformation.refreshTokenExpiration - now) / 1000
         };
         this.initializeAuthState(authData);
      } else if (isRefreshTokenValid) {
         this.getNewTokens();
      } else {
         this.logout();
      }
   }

   logout() {
      this.terminateAuthState();
      this.clearAuthData();
      this.router.navigate(['/auth/login']);
   }

   private getNewTokens() {
      const authInfo = this.getAuthData();

      this.http
         .post<{ msg: string; result: AuthData }>('/api/auth/refreshTokens', {
            refreshToken: authInfo.refreshToken
         })
         .subscribe(data => {
            this.initializeAuthState(data.result);
         });
   }

   private terminateAuthState() {
      this.userId = null;
      this.accessToken = null;
      clearTimeout(this.expiresInTimer);
      this.authStatus.next(false);
   }

   private setTimeWhenAuthExpires(expiresIn: number) {
      this.expiresInTimer = setTimeout(() => {
         this.getNewTokens();
      }, (expiresIn - 10) * 1000);
   }

   private saveAuthData(authData: AuthData) {
      const accessTokenExpiration = new Date(
         Date.now() + authData.accessTokenExpiration * 1000
      );
      const refreshTokenExpiration = new Date(
         Date.now() + authData.refreshTokenExpiration * 1000
      );

      localStorage.setItem('userId', authData.userId);
      localStorage.setItem('accessToken', authData.accessToken);
      localStorage.setItem(
         'accessTokenExpiration',
         accessTokenExpiration.toISOString()
      );
      localStorage.setItem('refreshToken', authData.refreshToken);
      localStorage.setItem(
         'refreshTokenExpiration',
         refreshTokenExpiration.toISOString()
      );
   }

   private clearAuthData() {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenExpiration');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenExpiration');
   }

   private getAuthData() {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      const accessTokenExpiration = localStorage.getItem(
         'accessTokenExpiration'
      );
      const refreshToken = localStorage.getItem('refreshToken');
      const refreshTokenExpiration = localStorage.getItem(
         'refreshTokenExpiration'
      );

      if (
         [
            userId,
            accessToken,
            accessTokenExpiration,
            refreshToken,
            refreshTokenExpiration
         ].includes(null)
      ) {
         this.logout();
         return;
      }

      return {
         userId,
         accessToken,
         accessTokenExpiration: new Date(accessTokenExpiration).getTime(),
         refreshToken,
         refreshTokenExpiration: new Date(refreshTokenExpiration).getTime()
      };
   }
}
