import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../user/user';

@Injectable()
export class AdminService {
  /**
   * Blog errors stored here for alerting to user
   */
  public error: string|null = null;

  constructor(
    private _authHttp: AuthHttp,
    private _router: Router
  ) {}

  /**
   * Delete blog entry
   * @param {User} user - User
   */
  public deleteUser(user: User): Observable<any> {
    return this._authHttp.delete('/api/admin/users/' + user._id)
      .map(res => res.json());
  }

  /**
   * Get user by id
   *
   * @param {string} id - User id
   * @returns {Observable<User>} user - User
   */
  public getUser(id: string): Observable<User> {
    return this._authHttp.get('/api/admin/users/' + id)
      .map(res => res.json());
  }

  /**
   * Get user list
   * @param {Object} params - Params for filtering user list
   * @return {Promise<any>} userList - Promise resolving to items, count, skip
   */
  public getUserList = (params: any): Promise<any> => {
    const searchParams = Object.assign({}, params);

    if (searchParams.page) {
      searchParams.skip = searchParams.limit * (searchParams.page - 1);
      delete searchParams.page;
    }

    if (!searchParams.sort) {
      searchParams.sort = '-created';
    }

    const queryParams = new URLSearchParams();

    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        queryParams.set(key, searchParams[key]);
      }
    }

    return this._authHttp.get('/api/admin/users', {search: queryParams})
      .map(res => res.json())
      .map(res => ({
        items: res.users,
        count: res.count,
        skip: searchParams.skip
      }))
      .toPromise();
  }

  /**
   * Update user
   * @param {User} user - User
   */
  public updateUser(user: User): void {
    if (user.roles.includes('none')) {
      user.roles = [];
    }

    this._authHttp.put('/api/admin/users/' + user._id, user)
      .map(res => res.json())
      .subscribe(() => {
        this._router.navigate(['/admin/user/list']);
      }, err => this.error = JSON.parse(err._body).msg || err.statusText);
  }
}
