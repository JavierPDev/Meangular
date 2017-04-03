import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-oauth',
  template: ``
})
export class OauthComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private _router: Router,
    private _http: Http
  ) {}

  ngOnInit() {
    // Get and set jwt and user after redirect from oauth authentication
    this._http.get('/auth/oauth/token')
      .map(res => res.json())
      .subscribe(res => {
        const redirect = localStorage['redirect'] || '/';
        this.authService.setAuthenticatedUser(res);
        this._router.navigate([redirect]);
      },
        err => console.log);
  }
}
