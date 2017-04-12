import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ProfileComponent } from './profile.component';
import { OauthComponent } from './oauth.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';

const USER_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Signup'
    }
  },
  {
    path: 'oauth',
    component: OauthComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent,
    canActivate: [UnauthenticatedGuard],
    data: {
      title: 'Password Reset'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(USER_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
