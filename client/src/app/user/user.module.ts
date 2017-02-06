import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ProfileComponent } from './profile.component';
import { OauthComponent } from "./oauth.component";
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    OauthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
  ],
  providers: [
    AuthService,
    AuthenticatedGuard
  ]
})
export class UserModule { }
