/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../user/auth.service';

describe('NavbarComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: AuthService, useFactory: () => ({logout: function() {}})}
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('calls AuthService logout method when component logout called', () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'logout');
    expect(authService.logout).not.toHaveBeenCalled();
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
