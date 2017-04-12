import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const CORE_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: '404 - Page Not Found'
    }
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(CORE_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule {}
