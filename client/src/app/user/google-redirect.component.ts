import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-google-redirect',
  template: ``
})
export class GoogleRedirectComponent implements OnInit {
  constructor(public authService: AuthService,
              private _router: Router,
              private _http: Http) {}

  ngOnInit() {
    this._http.get('/auth/google/token')
      .map(res => res.json())
      .subscribe(res => {
        this.authService.setAuthenticatedUser(res);
        this._router.navigate(['/profile']);
      },
        err => console.log);
  }
}
