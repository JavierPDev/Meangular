import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class AuthService {
  public isAdmin: boolean = false;
  public loggedIn: boolean = false;
  private _user: User;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authHttp: AuthHttp
  ) {
    this.getAuthenticatedState();
  }

  public login(email: string, password: string) {
    return this._http.post('/api/login', { email, password })
      .map(res => res.json())
      .subscribe((res) => this._onAuthenticated.call(this, res));
  }

  public logout() {
    if (!localStorage['id_token']) return;

    return this._authHttp.get('/api/logout')
      .subscribe(() => {
        this._setUnauthenticatedUser();
        this._router.navigate(['/']);
      });
  }

  public signup(user: User) {
    return this._http.post('/api/signup', user)
      .map(res => res.json())
      .subscribe(res => this._onAuthenticated.call(this, res));
  }

  public user(): User {
    return this._user;
  }

  public getAuthenticatedState() {
    if (!localStorage['id_token'])
      return Promise.resolve({authenticated: false});

    if (localStorage['id_token'])
    return this._authHttp.get('/api/authenticate')
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        if (res && res.user && res.token) {
          this._setAuthenticatedUser(res);
        }
        return res;
      });
  }

  private _onAuthenticated(res: any): void {
    this._setAuthenticatedUser(res);
    this._router.navigate(['/profile']);
  }
  
  private _setAuthenticatedUser(res: any) {
    this._user = res.user;
    this.isAdmin = this._user.roles.indexOf('admin') > -1;
    this.loggedIn = true;

    localStorage['id_token'] = res.token;
  }

  private _setUnauthenticatedUser() {
    this._user = null;
    this.isAdmin = false;
    this.loggedIn = false;
    localStorage.removeItem('id_token');
  }
}
