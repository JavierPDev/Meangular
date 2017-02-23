import { RouterModule } from "@angular/router";

import { USER_ROUTES } from './user/user.routes';
import { CORE_ROUTES } from './core/core.routes';
import { BLOG_ROUTES } from './blog/blog.routes';

const APP_ROUTES = [
  ...USER_ROUTES,
  ...BLOG_ROUTES,

  // Place last to catch 404s
  ...CORE_ROUTES
];

export const Routes = RouterModule.forRoot(APP_ROUTES);
