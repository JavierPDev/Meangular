import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public auth;

  constructor(private _authService: AuthService) {
    this.auth = this._authService;
  }

  logout() {
    this._authService.logout();
  }
}
