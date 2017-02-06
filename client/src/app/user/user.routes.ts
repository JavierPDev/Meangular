import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import { ProfileComponent } from "./profile.component";
import { OauthComponent } from "./oauth.component";
import { AuthenticatedGuard } from "./authenticated.guard";

export const USER_ROUTES = [
	{
    path: 'login',
    component: LoginComponent
  },
	{
    path: 'signup',
    component: SignupComponent
  },
	{
    path: 'oauth',
    component: OauthComponent
  },
	{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard]
  }
];

