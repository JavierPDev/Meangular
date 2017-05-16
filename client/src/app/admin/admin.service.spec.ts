/* tslint:disable:no-unused-variable */

import { TestBed, inject, fakeAsync, async, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, RequestMethod,
  Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AdminService } from './admin.service';

// tslint:disable-next-line
const jwt = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODk4ZTg3MzFhYTM5Nzc5NTk4OTY1NjIiLCJpYXQiOjE0ODgzMDUwMDYsImV4cCI6MTQ4ODMxMjIwNn0.Mk41xT9GHchIzkI2NQQF_jWymmNpIcVB1YJFaL5Olho';
let service;
let mockBackend;

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: AuthHttp,
          useExisting: Http
        },
        {
          provide: Router,
          useValue: {
            navigate: () => true,
            navigateByUrl: () => true
          }
        },
        AdminService
      ]
    });
  });

  beforeEach(inject([AdminService, MockBackend], (a, m) => {
    service = a;
    mockBackend = m;
  }));

  beforeAll(() => {
    // Set token for auth requests
    localStorage.setItem('id_token', jwt);
  });

  afterAll(() => {
    localStorage.removeItem('id_token');
  });

  it('loads correctly', () => {
    expect(service).toBeTruthy();
  });
});
