import { Component, OnInit, OnDestroy } from '@angular/core';
import {
   FormGroup,
   FormControl,
   Validators,
   AbstractControl,
   ValidationErrors
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import {
   debounceTime,
   distinctUntilChanged,
   switchMap,
   map,
   first
} from 'rxjs/operators';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
   authForm: FormGroup;
   private subscription: Subscription;

   constructor(private authService: AuthService) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   onSubmit() {
      if (!this.authForm.valid) {
         return;
      }

      this.authService.signup(this.authForm.value);
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
