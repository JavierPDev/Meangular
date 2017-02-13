import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import { ProfileComponent } from "./profile.component";
import { OauthComponent } from "./oauth.component";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ResetPasswordComponent } from "./reset-password.component";
import { AuthenticatedGuard } from "./authenticated.guard";
import { UnauthenticatedGuard } from "./unauthenticated.guard";

export const USER_ROUTES = [
	{
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
	{
    path: 'signup',
    component: SignupComponent,
    canActivate: [UnauthenticatedGuard]
  },
	{
    path: 'oauth',
    component: OauthComponent
  },
	{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'reset/:token',
    component: ResetPasswordComponent,
    canActivate: [UnauthenticatedGuard]
  }
];

