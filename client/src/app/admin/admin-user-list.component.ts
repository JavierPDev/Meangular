import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { AdminService } from './admin.service';
import { User } from '../user/user';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html'
})
export class AdminUserListComponent {
  public sortFields = [
    {displayName: 'Email', fieldName: 'email'},
    {displayName: 'Created At', fieldName: 'createdAt'},
    {displayName: 'Last Logged In', fieldName: 'lastLoggedIn'},
    {displayName: 'Name', fieldName: 'profile.name'},
  ];
  public url = '/admin/user/list';

  constructor(
    public auth: AuthService,
    public adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
   ) {}

  public deleteUser(user: User): void {
    this.adminService.deleteUser(user)
      .subscribe(() => {
        const queryParams: any = Object.assign({}, this._route.snapshot.queryParams);
        queryParams.cache = new Date().valueOf();
        // Navigate to same url with cache buster to trigger results update
        this._router.navigate([this.url], {queryParams, skipLocationChange: true});
      }, err => this.adminService.error = JSON.parse(err._body).msg || err.statusText);
  }
}

