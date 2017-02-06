import { RouterModule } from "@angular/router";

import { USER_ROUTES } from './user/user.routes';
import { CORE_ROUTES } from './core/core.routes';

const APP_ROUTES = [
  ...USER_ROUTES,
  ...CORE_ROUTES
];

export const Routes = RouterModule.forRoot(APP_ROUTES);
