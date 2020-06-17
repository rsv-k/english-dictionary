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
      return this.http.post('/api/auth/signup', { user: userModel });
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
   }

   logout() {
      this.terminateAuthState();
      this.router.navigate(['/auth/login']);
   }

   private terminateAuthState() {
      this.userId = null;
      this.accessToken = null;
      clearTimeout(this.expiresInTimer);
      this.authStatus.next(false);
   }

   private setTimeWhenAuthExpires(expiresIn: number) {
      this.expiresInTimer = setTimeout(() => {
         this.logout();
      }, expiresIn * 1000);
   }
}
