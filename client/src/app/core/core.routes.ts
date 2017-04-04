import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const CORE_ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

