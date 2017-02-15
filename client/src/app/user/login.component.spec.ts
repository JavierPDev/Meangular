/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from '../user/auth.service';

describe('LoginComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({login: function(email, password){}})
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the login component', () => {
    expect(component).toBeTruthy();
  });

  it('calls AuthService login method when component login method called',
     () => {
    const email = 'test@test.com';
    const password = 'password';
    component.email = email;
    component.password = password;
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'login');
    expect(authService.login).not.toHaveBeenCalled();
    component.login();
    expect(authService.login).toHaveBeenCalledWith(email, password);
  });
});
