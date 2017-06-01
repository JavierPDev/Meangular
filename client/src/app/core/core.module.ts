import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

import { UserModule } from '../user/user.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { CoreRoutingModule } from './core.routes';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),

    CoreRoutingModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class CoreModule { }
