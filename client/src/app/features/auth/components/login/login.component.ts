import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   authForm: FormGroup;

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   onSubmit() {
      if (!this.authForm.valid) {
         return;
      }

      this.authService.signup(this.authForm.value).subscribe();
   }

   private initializeForm() {
      this.authForm = new FormGroup({
         email: new FormControl(''),
         password: new FormControl('')
      });
   }
}
