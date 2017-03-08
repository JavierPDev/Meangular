import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;

  constructor(public authService: AuthService, private _fb: FormBuilder) {}

  public signup(): void {
    const user: User = this.signupForm.value;
    this.authService.signup(user);
  }

  ngOnInit() {
    this.signupForm = this._fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(this.authService.emailPattern)
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      'confirmPassword': ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      'profile': this._fb.group({
        'name': ['', [
          Validators.required,
          Validators.minLength(3)
        ]]
      })
    });
  }

  ngOnDestroy() {
    this.authService.error = null;
  }
}
