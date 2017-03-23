import { BlogCreateComponent } from './blog-create.component';
import { BlogListComponent } from './blog-list.component';
import { BlogViewComponent } from './blog-view.component';
import { BlogEditComponent } from './blog-edit.component';
import { BlogEntryResolver } from './blog-entry.resolver';
import { BlogListResolver } from './blog-list.resolver';
import { AuthenticatedGuard } from "../user/authenticated.guard";

export const BLOG_ROUTES = [
  {
    path: 'blog/create',
    component: BlogCreateComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'blog/list',
    component: BlogListComponent,
    resolve: {
      blogList: BlogListResolver
    }
  },
  {
    path: 'blog/:slug',
    component: BlogViewComponent,
    resolve: {
      blogEntry: BlogEntryResolver
    }
  },
  {
    path: 'blog/:slug/edit',
    component: BlogEditComponent,
    resolve: {
      blogEntry: BlogEntryResolver
    },
    canActivate: [AuthenticatedGuard]
  }
];
