import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBlogListComponent } from './admin-blog-list.component';
import { AdminAuthenticatedGuard } from './admin-auth.guard';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blog/list',
        component: AdminBlogListComponent,
        data: {
          title: 'Admin Blog List'
        },
        canActivate: [AdminAuthenticatedGuard],
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
