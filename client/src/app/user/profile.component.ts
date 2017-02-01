import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.user = this._authService.user();
  }
}
