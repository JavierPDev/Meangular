import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ProfileComponent } from './profile.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { OauthComponent } from "./oauth.component";
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OauthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [
    AuthService,
    AuthenticatedGuard,
    UnauthenticatedGuard
  ]
})
export class UserModule { }
