import { Component, OnInit, OnDestroy } from '@angular/core';
import {
   FormGroup,
   FormControl,
   Validators,
   AbstractControl,
   ValidationErrors
} from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import {
   debounceTime,
   distinctUntilChanged,
   switchMap,
   first,
   map
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
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

      this.authService.signup(this.authForm.value).subscribe(() => {
         this.authForm.reset();
         this.router.navigate(['/auth/login']);
      });
   }

   private initializeForm() {
      this.authForm = new FormGroup({
         email: new FormControl(
            '',
            [Validators.required, Validators.email],
            this.isFieldTaken.bind(this, 'email')
         ),
         password: new FormControl('', [
            Validators.required,
            Validators.minLength(8)
         ]),
         username: new FormControl(
            '',
            [Validators.required, Validators.minLength(4)],
            this.isFieldTaken.bind(this, 'username')
         )
      });
   }

   private isFieldTaken(
      propertyName: string,
      control: AbstractControl
   ): Observable<ValidationErrors | null> {
      return control.valueChanges.pipe(
         debounceTime(1000),
         distinctUntilChanged(),
         switchMap(() =>
            this.authService.checkIfTaken(propertyName, control.value)
         ),
         map(res => (res.isPresent ? res : null)),
         first()
      );
   }

   ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }
}
