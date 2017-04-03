/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SignupComponent } from './signup.component';
import { AuthService } from '../user/auth.service';
import { User } from './user';

describe('SignupComponent', () => {
  let fixture;
  let component;
  const userStub = {
    email: 'test@test.com',
    password: 'testpass',
    confirmPassword: 'testpass',
    profile: {
      name: 'Test'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        SignupComponent
      ],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            return {
              signup: function(user) {
                return Observable.of(user);
              }
            };
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the signup component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('creates a signupForm FormGroup', () => {
      component.ngOnInit();
      expect(component.signupForm instanceof FormGroup).toBe(true);
    });

    it('fills signupForm values with empty values', () => {
      component.ngOnInit();
      expect(component.signupForm.controls.email.value).toBe('');
      expect(component.signupForm.controls.password.value).toBe('');
      expect(component.signupForm.controls.confirmPassword.value).toBe('');
      expect(component.signupForm.controls.profile.value.name).toBe('');
    });
  });

  it('calls AuthService signup method when component signup method called',
     () => {
    component.ngOnInit();
    component.signupForm.patchValue(userStub);
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'signup').and.callThrough();
    expect(authService.signup).not.toHaveBeenCalled();
    component.signup();
    expect(authService.signup).toHaveBeenCalledWith(userStub);
  });
});
