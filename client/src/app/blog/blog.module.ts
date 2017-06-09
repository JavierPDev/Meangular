import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BlogCreateComponent } from './blog-create.component';
import { BlogViewComponent } from './blog-view.component';
import { BlogEditComponent } from './blog-edit.component';
import { BlogListComponent } from './blog-list.component';
import { CommentViewComponent } from './comment-view.component';
import { CommentEditComponent } from './comment-edit.component';
import { BlogEntryResolver } from './blog-entry.resolver';
import { BlogService } from './blog.service';
import { BlogRoutingModule } from './blog.routes';

@NgModule({
  declarations: [
    BlogCreateComponent,
    BlogViewComponent,
    BlogEditComponent,
    BlogListComponent,
    CommentViewComponent,
    CommentEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    BlogRoutingModule,
    CoreModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
    BlogService,
    BlogEntryResolver,
  ]
})
export class BlogModule {}
