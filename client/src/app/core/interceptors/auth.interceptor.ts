import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService) {}

   intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
   ): Observable<HttpEvent<unknown>> {
      const accessToken = this.authService.accessToken;
      const req = request.clone({
         headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
      });
      return next.handle(req);
   }
}
