/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../user/auth.service';

describe('ResetPasswordComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ResetPasswordComponent
      ],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            return {
              resetPassword: function(password, confirmPassword) {
                return Observable.from([password, confirmPassword]);
              }
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({token: 'test'})
          }
        }
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the reset password component', () => {
    expect(component).toBeTruthy();
  });

  it('creates a resetForm FormGroup', () => {
    component.ngOnInit();
    expect(component.resetForm instanceof FormGroup).toBe(true);
    expect(component.resetForm.value.password).toBe('');
    expect(component.resetForm.value.confirmPassword).toBe('');
  });

  it('calls AuthService resetPassword method when component reset method called',
     () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const password = 'password';
    const confirmPassword = 'password';
    component.ngOnInit();
    component.resetForm.patchValue({password, confirmPassword});
    spyOn(authService, 'resetPassword').and.callThrough();
    expect(authService.resetPassword).not.toHaveBeenCalled();
    component.reset();
    expect(authService.resetPassword)
      .toHaveBeenCalledWith(password, confirmPassword, component._resetToken);
  });
});
