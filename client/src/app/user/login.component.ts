import { Component, OnDestroy } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  public email: string;
  public password: string;

  constructor(public authService: AuthService) {}

  public login(ev): void {
    console.log('this authService', this.authService);
    this.authService.login(this.email, this.password);
  }

  ngOnDestroy() {
    this.authService.error = null;
  }
}
