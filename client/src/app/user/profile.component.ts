import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public message: String = '';
  public passwordForm: FormGroup;
  public profileForm: FormGroup;
  private _user = this.authService.user();

  constructor(public authService: AuthService,
              private _fb: FormBuilder) {}

  public changePassword(): void {
    const {password, confirmPassword} = this.passwordForm.value;
    this.authService.changePassword(password, confirmPassword)
      .subscribe(res => this._flashMessage('Password updated'),
                 err => this._flashError(JSON.parse(err._body)[0].msg));
  }

  public updateUser(): void {
    const user = this.profileForm.value;
    this.authService.updateUser(user)
      .subscribe(res => this._flashMessage('Profile updated'),
                 err => this._flashError('Could not update profile'));
  }

  private _flashError(errMessage): void {
    this.authService.error = errMessage;
    setTimeout(() => this.authService.error = null, 3000);
  }

  private _flashMessage(message): void {
    this.message = message;
    setTimeout(() => this.message = null, 3000);
  }

  ngOnInit() {
    this.profileForm = this._fb.group({
      'email': [this._user.email, [
        Validators.required,
        Validators.pattern(this.authService.emailPattern)
      ]],
      'profile': this._fb.group({
        'name': [this._user.profile.name, [
          Validators.required,
          Validators.minLength(3)
        ]],
        'gender': [this._user.profile.gender],
        'location': [this._user.profile.location],
        'website': [this._user.profile.website],
      })
    });
    this.passwordForm = this._fb.group({
      'password': ['', Validators.minLength(4)],
      'confirmPassword': ['', Validators.minLength(4)]
    });
  }
}
