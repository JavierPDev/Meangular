import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { AuthService } from './auth.service';

const uploadOptions = {
  url: '/api/photos/upload',
  authToken: localStorage['id_token']
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public message: String = '';
  public passwordForm: FormGroup;
  public profileForm: FormGroup;
  public uploader: FileUploader = new FileUploader(uploadOptions);
  public uploading = false;
  public user = this.authService.user();
  public profilePic = this.user.profile.picture;

  constructor(
    public authService: AuthService,
    private _detector: ChangeDetectorRef,
    private _fb: FormBuilder
  ) {}

  public changePassword(): void {
    const {password, confirmPassword} = this.passwordForm.value;
    this.authService.changePassword(password, confirmPassword)
      .subscribe(res => this._flashMessage('Password updated'),
                 err => this._flashError(JSON.parse(err._body)[0].msg));
    this.passwordForm.patchValue({
      password: '',
      confirmPassword: ''
    });
  }

  /**
   * Detect changes to component. Needed because file-upload plugin isn't
   * detecting changes on its own.
   */
  public detectChanges(): void {
    this._detector.detectChanges();
  }

  public startUpload(): void {
    this.uploading = true;
    this.uploader.queue[0].upload();
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
      'email': [this.user.email, [
        Validators.required,
        Validators.pattern(this.authService.emailPattern)
      ]],
      'profile': this._fb.group({
        'name': [this.user.profile.name, [
          Validators.required,
          Validators.minLength(3)
        ]],
        'gender': [this.user.profile.gender],
        'location': [this.user.profile.location],
        'website': [this.user.profile.website],
      })
    });
    this.passwordForm = this._fb.group({
      'password': ['', Validators.minLength(6)],
      'confirmPassword': ['', Validators.minLength(6)]
    });
    this.uploader.onSuccessItem = (item, fileUrl) => {
      this.profilePic = fileUrl;
      this.uploader.queue.splice(0, 1);
      this.uploading = false;
      this.detectChanges();
    };
  }
}
