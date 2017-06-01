import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule  } from 'ng2-bootstrap/pagination';

import { PaginatedSearchListComponent } from './paginated-search-list.component';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    PaginatedSearchListComponent,
    SearchBoxComponent,
  ],
  exports: [
    PaginatedSearchListComponent,
    SearchBoxComponent,
  ]
})
export class SharedModule { }
