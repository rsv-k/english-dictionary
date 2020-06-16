import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
   declarations: [AuthComponent, SignupComponent, LoginComponent],
   imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule]
})
export class AuthModule {}
