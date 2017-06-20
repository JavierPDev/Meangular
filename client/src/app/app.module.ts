import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './app.routes';
import { httpFactory } from './core/http.factory';

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
    HttpModule,
    SlimLoadingBarModule.forRoot(),

    AppRoutingModule,
    UserModule,
    CoreModule,
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
    // Use custom http service which uses slim loading bar.
    // See `./core/http.interceptor.ts`
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [ XHRBackend, RequestOptions, SlimLoadingBarService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
