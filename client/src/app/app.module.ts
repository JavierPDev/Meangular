import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login.component';
import { SignupComponent } from './user/signup.component';
import { ProfileComponent } from './user/profile.component';
import { AuthService } from './user/auth.service';
import { AuthenticatedGuard } from './user/authenticated.guard';
import { Routes } from './app.routes';
import { GlobalErrorHandler } from './common/global-error-handler';

// Needed for angular2-jwt to work properly. See:
// https://github.com/auth0/angular2-jwt/issues/258#issuecomment-272223420
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    Routes
  ],
  providers: [
    // Needed for angular2-jwt to work properly. See:
    // https://github.com/auth0/angular2-jwt/issues/258#issuecomment-272223420
		{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },

    // { 
		// 	provide: ErrorHandler,
		// 	useClass: GlobalErrorHandler
    // },
    AuthService,
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
