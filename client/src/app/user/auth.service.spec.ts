/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync, async, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, RequestMethod,
  Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODk4ZTg3MzFhYTM5Nzc5NTk4OTY1NjIiLCJpYXQiOjE0ODg4MTg5NTcsImV4cCI6MjM1MjgxODk1N30.A0BCOmA2pUBWch85ou_fKv87zZMrFxczd2uTFOdToeE';
const authenticatedResponseStub = {
  authenticated: true,
  redirect: false,
  success: true,
  token: jwt,
  user: {
    _id: 'objectid',
    email: 'testuser@test.com',
    profile: { name: 'Test User' },
    roles: ['admin']
  }
};
const email = 'testuser@test.com';
const password = 'a5ljkaA!lj';
let service;
let mockBackend;
// Overwrite private method that doesn't need testing
AuthService.prototype._watchForRedirectTarget = function(){};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions)
            => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
				{
					provide: AuthHttp,
          useExisting: Http
				},
        {
          provide: Router,
          useValue: {
            navigate: () => true
          }
        },
        AuthService
      ]
    });
  });

  beforeEach(inject([AuthService, MockBackend], (a, m) => {
    service = a;
    mockBackend = m;
  }));

  it('loads correctly', () => {
    expect(service).toBeTruthy();
    expect(service.login).toBeTruthy();
  });

  describe('changePassword()', () => {
    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/account/password`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.changePassword(password, password);
      tick();
    }));

    it('uses the PUT request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Put);
      });
      service.changePassword(password, password);
      tick();
    }));

    it('returns an observable', () => {
      const returned = service.changePassword(password, password);
      expect(returned instanceof Observable).toBe(true);
    });
  });

  describe('forgot()', () => {
    it('calls the correct api url', fakeAsync(() => {
      const expectedUrl = `/api/forgot`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.forgot(email);
      tick();
    }));

    it('uses the POST request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Post);
      });
      service.forgot(email);
      tick();
    }));

    it('returns an observable', () => {
      const returned = service.forgot(email);
      expect(returned instanceof Observable).toBe(true);
    });
  });

  describe('getAuthenticatedState()', () => {
    beforeEach(() => {
      localStorage.removeItem('id_token');
    });

    it('resolves to false if no token present', fakeAsync(() => {
      service.getAuthenticatedState()
        .then((authState) => {
          expect(authState).toBe(false);
        })
      tick();
    }));

    it('calls the correct url if valid token is present', fakeAsync(() => {
      localStorage.setItem('id_token', jwt);
      const expectedUrl = '/api/authenticate';
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.getAuthenticatedState();
      tick();
    }));

    it('uses the GET request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Get);
      });
      service.getAuthenticatedState();
      tick();
    }));

    it('resolves to true if authenticated', fakeAsync(() => {
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.getAuthenticatedState()
        .then(isAuthenticated => {
          expect(isAuthenticated).toBe(true);
        })
      tick();
    }));

    it('calls setAuthenticatedUser with response if resolved', fakeAsync(() => {
      spyOn(service, 'setAuthenticatedUser');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.getAuthenticatedState()
        .then(authState => {
          expect(service.setAuthenticatedUser)
            .toHaveBeenCalledWith(authenticatedResponseStub);
        })
      tick();
    }));
  });

  describe('login()', () => {
    beforeEach(() => {
      localStorage.removeItem('id_token');
    });

    it('calls the correct url', fakeAsync(() => {
      const expectedUrl = '/api/login';
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.login(email, password);
      tick();
    }));

    it('uses the POST request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Post);
      });
      service.login(email, password);
      tick();
    }));

    it('setAuthenticatedUser() is called if login works', fakeAsync(() => {
      spyOn(service, 'setAuthenticatedUser');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.login(email, password);
      expect(service.setAuthenticatedUser)
        .toHaveBeenCalledWith(authenticatedResponseStub);
      tick();
    }));

    it('successful login navigates to set redirect url ', fakeAsync(() => {
      const redirectUrl = '/profile';
      localStorage.setItem('redirect', redirectUrl);
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.login(email, password);
      expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
      tick();
    }));

    it('successful login navigates to / if no set redirect ', fakeAsync(() => {
      localStorage.removeItem('redirect');
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.login(email, password);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      tick();
    }));

    it('failed login should cause error field to be filled with msg',
       fakeAsync(() => {
      const failResponse = {
        authenticated: false,
        success: false,
        redirect: false,
        msg: 'Invalid email or password'
      };
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(failResponse)
        });
        c.mockError(new Response(response));
      });
      service.login(email, password);
      expect(service.error).toBe(failResponse.msg);
      tick();
    }));
  });

  describe('logout()', () => {
    beforeEach(() => {
      localStorage.setItem('id_token', jwt);
    });

    it('calls the correct url', fakeAsync(() => {
      const expectedUrl = '/api/logout';
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.logout();
      tick();
    }));

    it('uses the GET request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Get);
      });
      service.logout();
      tick();
    }));

    it('resets user, loggedIn, isAdmin, and jwt', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(null)
        });
        c.mockRespond(new Response(response));
      });
      service.logout();
      tick();
      expect(service.user()).toBe(null);
      expect(service.isAdmin).toBe(false);
      expect(service.loggedIn).toBe(false);
      expect(localStorage['id_token']).toBe(undefined);
    }));

    it('navigates to /', fakeAsync(() => {
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      tick();
    }));
  });

  describe('resetPassword()', () => {
    const resetToken = 'aw5lejkalwkje6a$aslgj';

    beforeEach(() => {
      localStorage.removeItem('id_token');
    });

    it('calls the correct url', fakeAsync(() => {
      const expectedUrl = `/api/reset/${resetToken}`;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.resetPassword(password, password, resetToken);
      tick();
    }));

    it('uses the POST request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Post);
      });
      tick();
    }));

    it('returns an observable', () => {
      const returned = service.resetPassword(password, password, resetToken);
      expect(returned instanceof Observable).toBe(true);
    });
  });

  describe('setAuthenticatedUser()', () => {
    it('sets proper user, isAdmin, logedIn, and token', () => {
      service.setAuthenticatedUser(authenticatedResponseStub);
      expect(service.user()).toBe(authenticatedResponseStub.user);
      expect(service.loggedIn).toBe(true);
      expect(service.isAdmin).toBe(true);
      expect(localStorage['id_token']).toBe(authenticatedResponseStub.token);
    });
  });

  describe('signup()', () => {
    const newUser = {
      profile: { name: 'New User' },
      email: 'newuser@test.com',
      password,
      confirmPassword: password
    };

    beforeEach(() => {
      localStorage.removeItem('id_token');
    });

    it('calls the correct url', fakeAsync(() => {
      const expectedUrl = '/api/signup';
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.signup(newUser);
      tick();
    }));

    it('uses the POST request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Post);
      });
      service.signup(newUser);
      tick();
    }));

    it('setAuthenticatedUser() is called if signup works', fakeAsync(() => {
      spyOn(service, 'setAuthenticatedUser');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.signup(newUser);
      expect(service.setAuthenticatedUser)
        .toHaveBeenCalledWith(authenticatedResponseStub);
      tick();
    }));

    it('successful signup navigates to set redirect url ', fakeAsync(() => {
      const redirectUrl = '/profile';
      localStorage.setItem('redirect', redirectUrl);
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.signup(newUser);
      expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
      tick();
    }));

    it('successful signup navigates to / if no set redirect ', fakeAsync(() => {
      localStorage.removeItem('redirect');
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      localStorage.setItem('id_token', jwt);
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(authenticatedResponseStub)
        });
        c.mockRespond(new Response(response));
      });
      service.signup(newUser);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      tick();
    }));

    it('failed signup should cause error field to be filled with msg',
       fakeAsync(() => {
      const failResponse = {
        msg: 'Account with that email address already exists'
      };
      mockBackend.connections.subscribe(c => {
        const response = new ResponseOptions({
          body: JSON.stringify(failResponse)
        });
        c.mockError(new Response(response));
      });
      service.signup(newUser);
      expect(service.error).toBe(failResponse.msg);
      tick();
    }));
  });

  describe('updateUser()', () => {
    const updatedUser = {
      profile: { name: 'New User' },
      email: 'newuser@test.com',
      password,
      confirmPassword: password
    };

    it('calls the correct url', fakeAsync(() => {
      const expectedUrl = '/api/account/profile';
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe(expectedUrl);
      });
      service.updateUser(updatedUser);
      tick();
    }));

    it('uses the PUT request method', fakeAsync(() => {
      mockBackend.connections.subscribe(c => {
        expect(c.request.method).toBe(RequestMethod.Put);
      });
      service.updateUser(updatedUser);
      tick();
    }));

    it('returns an observable', () => {
      const returned = service.updateUser(updatedUser);
      expect(returned instanceof Observable).toBe(true);
    });
  });

  describe('user()', () => {
    it('returns null if not authenticated', () => {
      service._setUnauthenticatedUser();
      expect(service.user()).toBe(null);
    });

    it('returns user if authenticated', () => {
      service.setAuthenticatedUser(authenticatedResponseStub);
      expect(service.user()).toBe(authenticatedResponseStub.user);
    });
  });
});
