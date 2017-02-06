import { BrowserModule } from '@angular/platform-browser';
import { CommonModule  } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
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
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    SlimLoadingBarModule.forRoot(),

    UserModule,
    CoreModule,
    Routes
  ],
  exports: [
    SlimLoadingBarModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
