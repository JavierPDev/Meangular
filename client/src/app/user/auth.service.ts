import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public error: string;
  public isAdmin: boolean = false;
  public loggedIn: boolean = false;
  private _jwtHelper: JwtHelper = new JwtHelper();
  private _user;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authHttp: AuthHttp
  ) {
    this.getAuthenticatedState();
  }
  
  public changePassword({password, confirmPassword}) {
    return this._authHttp.put('/api/account/password',
      {password, confirmPassword})
      .map(res => res.json());
  }

  public login(email: string, password: string) {
    return this._http.post('/api/login', { email, password })
      .map(res => res.json())
      .subscribe(res => this._onAuthenticated.call(this, res),
                err => this.error = JSON.parse(err._body).msg);
  }

  public logout() {
    if (!localStorage['id_token']) return;

    return this._authHttp.get('/api/logout')
      .subscribe(() => {
        this._setUnauthenticatedUser();
        this._router.navigate(['/']);
      });
  }

  public signup(user) {
    return this._http.post('/api/signup', user)
      .map(res => res.json())
      .subscribe(res => this._onAuthenticated.call(this, res),
                err => this.error = JSON.parse(err._body).msg);
  }

  public getAuthenticatedState(): Promise<Boolean> {
    const token = localStorage['id_token'];
    const tokenIsPresentAndExpired = token
      && this._jwtHelper.isTokenExpired(token);

    if (!token || tokenIsPresentAndExpired)
      return Promise.resolve(false);

    return this._authHttp.get('/api/authenticate')
      .map(res => res.json())
      .toPromise()
      .then((res) => {
        if (res && res.user && res.token) {
          this.setAuthenticatedUser(res);
          return true;
        }

        return false;
      });
  }
  
  public setAuthenticatedUser(res: any): void {
    this._user = res.user;
    this.isAdmin = this._user.roles.indexOf('admin') > -1;
    this.loggedIn = true;

    localStorage['id_token'] = res.token;
  }
  
  public updateUser(user) {
    return this._authHttp.put('/api/account/profile', user)
      .map(res => res.json());
  }

  public user() {
    return this._user;
  }

  private _onAuthenticated(res: any): void {
    this.setAuthenticatedUser(res);
    this._router.navigate(['/profile']);
  }

  private _setUnauthenticatedUser() {
    this._user = null;
    this.isAdmin = false;
    this.loggedIn = false;
    localStorage.removeItem('id_token');
  }
}
