import { RouterModule } from "@angular/router";

import { LoginComponent } from "./user/login.component";
import { SignupComponent } from "./user/signup.component";
import { ProfileComponent } from "./user/profile.component";
import { GoogleRedirectComponent } from "./user/google-redirect.component";
import { AuthenticatedGuard } from "./user/authenticated.guard";

const APP_ROUTES = [
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

export const Routes = RouterModule.forRoot(APP_ROUTES);
