import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   authStatus$: Observable<boolean>;

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      this.authStatus$ = this.authService.authStatusListener$;
   }

   logout() {
      this.authService.logout();
   }
}
