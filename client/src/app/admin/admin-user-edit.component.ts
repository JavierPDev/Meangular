import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from './admin.service';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html'
})
export class AdminUserEditComponent implements OnInit {
  public user: User;
  public userEditForm: FormGroup;

  constructor(
    public adminService: AdminService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.adminService.getUser(this._route.snapshot.params['id'])
      .subscribe((user: User) => {
        this.user = user;
        this._setupForm(user);
      });
  }

  private _setupForm = (user: User): void => {
    this.userEditForm = this._fb.group({
      'email': [user.email, [
        Validators.required,
        Validators.pattern(this._authService.emailPattern)
      ]],
      '_id': [user._id],
      'roles': [user.roles],
      'profile': this._fb.group({
        'name': [user.profile.name, [
          Validators.required,
          Validators.minLength(3)
        ]],
        'gender': [user.profile.gender],
        'location': [user.profile.location],
        'website': [user.profile.website],
      })
    });
  }
}
