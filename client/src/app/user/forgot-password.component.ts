import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm: FormGroup;
  public message: string = '';

  constructor(
    public authService: AuthService,
    private _fb: FormBuilder
  ) {}

  public forgot(): void {
    const {email} = this.forgotForm.value;
    this.authService.forgot(email)
      .subscribe(res => this._flashMessage('Email with reset link sent'),
                 err => this._flashError('Could not process'));
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
    this.forgotForm = this._fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(this.authService.emailPattern)
      ]]
    });
  }
}
