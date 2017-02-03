import { RouterModule } from "@angular/router";

import { USER_ROUTES } from './user/user.routes';

const APP_ROUTES = [
  ...USER_ROUTES
];

export const Routes = RouterModule.forRoot(APP_ROUTES);
