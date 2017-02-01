import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private _authService: AuthService) {}

  public login(ev): void {
    this._authService.login(this.email, this.password);
  }
}
