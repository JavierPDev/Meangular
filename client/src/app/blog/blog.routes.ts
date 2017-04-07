import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogCreateComponent } from './blog-create.component';
import { BlogListComponent } from './blog-list.component';
import { BlogViewComponent } from './blog-view.component';
import { BlogEditComponent } from './blog-edit.component';
import { BlogEntryResolver } from './blog-entry.resolver';
import { BlogListResolver } from './blog-list.resolver';
import { AuthenticatedGuard } from '../user/authenticated.guard';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';

const BLOG_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: BlogCreateComponent,
        canActivate: [AuthenticatedGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'list',
        component: BlogListComponent,
        resolve: {
          blogList: BlogListResolver
        }
      },
      {
        path: ':slug',
        component: BlogViewComponent,
        resolve: {
          blogEntry: BlogEntryResolver
        }
      },
      {
        path: ':slug/edit',
        component: BlogEditComponent,
        resolve: {
          blogEntry: BlogEntryResolver
        },
        canActivate: [AuthenticatedGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(BLOG_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {}
