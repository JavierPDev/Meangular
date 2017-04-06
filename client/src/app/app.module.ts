import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { PaginationModule  } from 'ng2-bootstrap/pagination';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { GlobalErrorHandler } from './common/global-error-handler';
import { AppRoutingModule } from './app.routes';

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
    PaginationModule.forRoot(),

    BlogModule,
    UserModule,
    CoreModule,
    AppRoutingModule
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
