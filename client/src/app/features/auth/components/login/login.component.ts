import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
   authForm: FormGroup;
   private subscription: Subscription;

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   onSubmit() {
      if (!this.authForm.valid) {
         return;
      }

      this.authService.login(this.authForm.value).subscribe(data => {
         this.authService.initializeAuthState(data);
         this.router.navigate(['/dictionary']);
      });
   }

   private initializeForm() {
      this.authForm = new FormGroup({
         email: new FormControl(''),
         password: new FormControl('')
      });
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
}
