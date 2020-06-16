import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   constructor(private http: HttpClient) {}

   signup(userModel: User) {
      return this.http.post('/api/auth/signup', { user: userModel });
   }

   checkIfTaken(propertyName: string, propertyValue: string) {
      return this.http.post<{ isPresent: boolean }>('/api/auth/isTaken', {
         [propertyName]: propertyValue
      });
   }
}
