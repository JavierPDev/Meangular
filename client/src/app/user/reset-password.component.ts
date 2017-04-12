import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public message = '';
  private _resetToken: string;

  constructor(
    public authService: AuthService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}

  public reset(): void {
    const {password, confirmPassword} = this.resetForm.value;
    this.authService.resetPassword(password, confirmPassword, this._resetToken)
      .subscribe(res => this._flashMessage('Password reset'),
                 err => this._flashError(JSON.parse(err._body).msg[0].msg));
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
    this.resetForm = this._fb.group({
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      'confirmPassword': ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this._route.params
      .subscribe(params => this._resetToken = params['token']);
  }
}
