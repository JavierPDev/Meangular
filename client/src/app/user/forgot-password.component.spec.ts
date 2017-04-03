/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../user/auth.service';

describe('ForgotPasswordComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ForgotPasswordComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            return {
              forgot: function(email) {
                return Observable.from([email]);
              }
            };
          }
        }
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the forgot password component', () => {
    expect(component).toBeTruthy();
  });

  it('creates a forgotForm FormGroup', () => {
    component.ngOnInit();
    expect(component.forgotForm instanceof FormGroup).toBe(true);
    expect(component.forgotForm.value.email).toBe('');
  });

  it('calls AuthService forgot method when component forgot method called',
     () => {
    const email = 'test@test.com';
    const authService = fixture.debugElement.injector.get(AuthService);
    component.ngOnInit();
    component.forgotForm.patchValue({email});
    spyOn(authService, 'forgot').and.callThrough();
    expect(authService.forgot).not.toHaveBeenCalled();
    component.forgot();
    expect(authService.forgot).toHaveBeenCalledWith(email);
  });
});
