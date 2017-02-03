import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";
import { ProfileComponent } from "./profile.component";
import { GoogleRedirectComponent } from "./google-redirect.component";
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
    path: 'google-redirect',
    component: GoogleRedirectComponent
  },
	{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard]
  }
];

