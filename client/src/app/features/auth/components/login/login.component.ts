import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
   isError = false;
   private subscription: Subscription;

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   onSubmit() {
      if (!this.authForm.valid) {
         return;
      }

      this.authService.login(this.authForm.value).subscribe(
         data => {
            this.authService.initializeAuthState(data);
            this.router.navigate(['/dictionary']);
         },
         error => {
            this.isError = error.status === 404;
         }
      );
   }

   private initializeForm() {
      this.authForm = new FormGroup({
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', Validators.required)
      });
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
}
