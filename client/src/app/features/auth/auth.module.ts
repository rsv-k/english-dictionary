import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
   declarations: [AuthComponent, SignupComponent],
   imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule]
})
export class AuthModule {}
