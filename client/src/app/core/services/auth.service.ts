import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from '@core/models/authData.model';
import { pluck } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private authStatus = new BehaviorSubject<boolean>(false);
   private userId: string;
   private accessToken: string;

   authStatusListener$ = this.authStatus.asObservable();

   constructor(private http: HttpClient) {}

   getAccessToken() {
      return this.accessToken;
   }

   getUserId() {
      return this.userId;
   }

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
   }

   logout() {
      this.authStatus.next(false);
   }
}
