import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule  } from 'ng2-bootstrap/pagination';

import { UserModule } from '../user/user.module';
import { BlogCreateComponent } from './blog-create.component';
import { BlogViewComponent } from './blog-view.component';
import { BlogEditComponent } from './blog-edit.component';
import { BlogListComponent } from './blog-list.component';
import { BlogEntryResolver } from './blog-entry.resolver';
import { BlogListResolver } from './blog-list.resolver';
import { BlogService } from './blog.service';

@NgModule({
  declarations: [
    BlogCreateComponent,
    BlogViewComponent,
    BlogEditComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,

    UserModule
  ],
  exports: [
  ],
  providers: [
    BlogService,
    BlogEntryResolver,
    BlogListResolver
  ]
})
export class BlogModule {}
