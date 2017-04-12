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
        canDeactivate: [CanDeactivateGuard],
        data: {
          title: 'Create Blog Entry'
        }
      },
      {
        path: 'list',
        component: BlogListComponent,
        data: {
          title: 'Blog List'
        },
        resolve: {
          resolveData: BlogListResolver
        }
      },
      {
        path: ':slug',
        component: BlogViewComponent,
        data: {
          title: 'Blog Entry: '
        },
        resolve: {
          resolveData: BlogEntryResolver
        }
      },
      {
        path: ':slug/edit',
        component: BlogEditComponent,
        data: {
          title: 'Blog Edit: '
        },
        resolve: {
          resolveData: BlogEntryResolver
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
