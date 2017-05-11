import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule  } from 'ng2-bootstrap/pagination';

import { CoreModule } from '../core/core.module';
import { AdminBlogListComponent } from './admin-blog-list.component';
import { AdminService } from './admin.service';
import { AdminRoutingModule } from './admin.routes';

@NgModule({
  declarations: [
    AdminBlogListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),

    AdminRoutingModule,
    CoreModule
  ],
  exports: [
  ],
  providers: [
    AdminService,
  ]
})
export class BlogModule {}
