import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public message: String = '';
  public profileForm: FormGroup;
  private _user = this.authService.user();

  constructor(public authService: AuthService,
              private _fb: FormBuilder) {}

  public updateUser(): void {
    this.authService.updateUser(this.profileForm.value)
      .subscribe(res => {
        this.message = 'Profile successfully updated';
        setTimeout(() => this.message = '', 3000);
      }, err => {
        console.log('err', err);
        this.authService.error = 'Could not update profile';
      });
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
  }
  
  ngOnDestroy() {
    this.authService.error = null;
  }
}
