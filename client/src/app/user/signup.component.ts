import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  public user: User = new User();

  constructor(private _authService: AuthService) {}

  public signup(): void {
    this._authService.signup(this.user);
  }
}
