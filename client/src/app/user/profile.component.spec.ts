/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../user/auth.service';

describe('ProfileComponent', () => {
  let fixture;
  let component;
  const userStub = {
    email: 'test@test.com',
    profile: {
      name: 'Test',
      location: 'Chicago',
      gender: 'Male',
      website: 'test.com'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        ProfileComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            return {
              updateUser: function(user) {
                return Observable.from([user]);
              },
              changePassword: function(password, confirmPassword) {
                return Observable.from([password, confirmPassword]);
              },
              user: function() {
                return userStub;
              }
            };
          }
        }
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the profile component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('creates a profileForm FormGroup', () => {
      component.ngOnInit();
      expect(component.profileForm instanceof FormGroup).toBe(true);
    });

    it('creates a passwordForm FormGroup', () => {
      component.ngOnInit();
      expect(component.passwordForm instanceof FormGroup).toBe(true);
    });

    it('fills profileForm values based on auth service\'s user', () => {
      component.ngOnInit();
      expect(component.profileForm.controls.email.value).toBe(userStub.email);
      expect(component.profileForm.controls.profile.value.name)
        .toBe(userStub.profile.name);
      expect(component.profileForm.controls.profile.value.location)
        .toBe(userStub.profile.location);
      expect(component.profileForm.controls.profile.value.gender)
        .toBe(userStub.profile.gender);
      expect(component.profileForm.controls.profile.value.website)
        .toBe(userStub.profile.website);
    });

    it('fills passwordForm with empty strings', () => {
      component.ngOnInit();
      expect(component.passwordForm.controls.password.value).toBe('');
      expect(component.passwordForm.controls.confirmPassword.value).toBe('');
    });
  });

  describe('updateUser()', () => {
    it('calls AuthService updateUser method', () => {
      const authService = fixture.debugElement.injector.get(AuthService);
      component.ngOnInit();
      spyOn(authService, 'updateUser').and.callThrough();
      expect(authService.updateUser).not.toHaveBeenCalled();
      component.updateUser();
      expect(authService.updateUser).toHaveBeenCalledWith(userStub);
    });
  });

  describe('changePassword()', () => {
    it('calls AuthService changePassword method', () => {
      const authService = fixture.debugElement.injector.get(AuthService);
      const password = 'password';
      const confirmPassword = 'password';
      component.ngOnInit();
      spyOn(authService, 'changePassword').and.callThrough();
      expect(authService.changePassword).not.toHaveBeenCalled();
      component.passwordForm.patchValue({password, confirmPassword});
      component.changePassword();
      expect(authService.changePassword)
        .toHaveBeenCalledWith(password, confirmPassword);
    });
  });
});
