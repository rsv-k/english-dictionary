import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private authStatus = new BehaviorSubject<boolean>(false);
   private userId: string;

   authStatusListener$ = this.authStatus.asObservable();

   constructor(private http: HttpClient) {}

   getUserId() {
      return this.userId;
   }

   signup(userModel: User) {
      return this.http.post('/api/auth/signup', { user: userModel });
   }

   login(userModel: User) {
      return this.http.post<{ userId: string }>('/api/auth/login', {
         user: userModel
      });
   }

   checkIfTaken(propertyName: string, propertyValue: string) {
      return this.http.post<{ isPresent: boolean }>('/api/auth/isTaken', {
         [propertyName]: propertyValue
      });
   }

   setAuthData(userId: string) {
      this.authStatus.next(true), (this.userId = userId);
   }

   logout() {
      this.authStatus.next(false);
   }
}
