import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

import { UserModule } from '../user/user.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CoreRoutingModule } from './core.routes';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),

    CoreRoutingModule
  ],
  exports: [
    NavbarComponent,
    SearchBoxComponent
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class CoreModule { }
