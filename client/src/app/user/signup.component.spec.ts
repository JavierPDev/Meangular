/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';

import { SignupComponent } from './signup.component';
import { AuthService } from '../user/auth.service';
import { User } from './user';

describe('SignupComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
            }
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

  it('loads with user instance', () => {
    expect(component.user instanceof User).toBeTruthy();
  });

  it('calls AuthService signup method when component signup method called',
     () => {
    const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'signup').and.callThrough();
    expect(authService.signup).not.toHaveBeenCalled();
    component.signup();
    expect(authService.signup).toHaveBeenCalledWith(component.user);
  });
});
