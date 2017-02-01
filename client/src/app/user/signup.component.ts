import { Component, OnDestroy } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnDestroy {
  public user: User = new User();

  constructor(public authService: AuthService) {}

  public signup(): void {
    this.authService.signup(this.user);
  }

  ngOnDestroy() {
    this.authService.error = null;
  }
}
