import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  /**
   * Regex pattern used for form validation
   */
  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * Auth errors stored here for alerting to user
   */
  public error: string;
  /**
   * Admin status gotten from user roles
   */
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
    this._watchForRedirectTarget();

    // Set default redirect target. Localstorage needed for oauth auth flow.
    localStorage['redirect'] = '/';
  }
  
  /**
   * Change user's password
   * @param {Object} password form value - Password form value
   * @return {Observable} Res
   */
  public changePassword(password: string, confirmPassword: string) {
    return this._authHttp.put('/api/account/password',
      {password, confirmPassword})
      .map(res => res.json());
  }
  /**
   * Get whether user is authenticated or not
   * @return {Promise}
   */
  public getAuthenticatedState(): Promise<Boolean> {
    const token = localStorage['id_token'];
    const tokenIsPresentAndExpired = token
      && this._jwtHelper.isTokenExpired(token);

    if (!token || tokenIsPresentAndExpired)
      return Promise.resolve(false);

    return this._authHttp.get('/api/authenticate')
      .map(res => res.json())
      .toPromise()
      .then(res => {
        if (res && res.user && res.token) {
          this.setAuthenticatedUser(res);
          return true;
        }

        return false;
      });
  }
  /**
   * Login user using email and password
   * @param  {String} email
   * @param  {String} password
   */
  public login(email: string, password: string) {
    const redirect = localStorage['redirect'];

    return this._http.post('/api/login', {email, password, redirect})
      .map(res => res.json())
      .subscribe(res => this._onAuthenticated.call(this, res),
                err => this.error = JSON.parse(err._body).msg);
  }
  /**
   * Logout user and return to homepage.
   */
  public logout() {
    if (!localStorage['id_token']) return;

    return this._authHttp.get('/api/logout')
      .subscribe(() => {
        this._setUnauthenticatedUser();
        this._router.navigate(['/']);
      });
  }
  
  /**
   * Set user after authentication. Public for oauth.
   * @param  {Object} res - Response object from server
   * @return void
   */
  public setAuthenticatedUser(res): void {
    this._user = res.user;
    this.isAdmin = this._user.roles.indexOf('admin') > -1;
    this.loggedIn = true;

    localStorage['id_token'] = res.token;
  }
  /**
   * Signup user.
   * @param  {Object} user - User info for signup
   */
  public signup(user) {
    user.redirect = localStorage['redirect'];

    return this._http.post('/api/signup', user)
      .map(res => res.json())
      .subscribe(res => this._onAuthenticated.call(this, res),
                err => this.error = JSON.parse(err._body).msg);
  }
  
  /**
   * Update user.
   * @param  {Object} user - User info to update
   */
  public updateUser(user) {
    return this._authHttp.put('/api/account/profile', user)
      .map(res => res.json());
  }
  /**
   * Retrieve user.
   */
  public user() {
    return this._user;
  }

  private _onAuthenticated(res): void {
    this.setAuthenticatedUser(res);
    this._router.navigate([localStorage['redirect'] || '/']);
  }

  private _setUnauthenticatedUser() {
    this._user = null;
    this.isAdmin = false;
    this.loggedIn = false;

    localStorage.removeItem('id_token');
  }

  /**
   * Watch for route changes so a redirect target can be saved
   * for the user to be redirected to after authentication.
   */
  private _watchForRedirectTarget(): void {
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .filter(event => event.url !== '/login')
      .filter(event => event.url !== '/signup')
      .filter(event => event.url !== '/oauth')
      .subscribe(event => localStorage['redirect'] = event.url);
  }
}
