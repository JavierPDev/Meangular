import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogModule } from '../blog/blog.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AdminBlogListComponent } from './admin-blog-list.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin.routes';
import { AdminAuthenticatedGuard } from './admin-auth.guard';

@NgModule({
  declarations: [
    AdminBlogListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AdminRoutingModule,
    CoreModule,
    BlogModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
    AdminService,
    AdminAuthenticatedGuard
  ]
})
export class AdminModule {}
