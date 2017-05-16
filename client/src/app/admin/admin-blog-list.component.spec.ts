/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { AdminBlogListComponent } from './admin-blog-list.component';
import { AuthService } from '../user/auth.service';
import { BlogService } from '../blog/blog.service';

const blogListStub = [{
  title: 'Test blog entry',
  content: 'Test content',
  created: new Date(),
  _id: 'objectid',
  user: {
    profile: {
      name: 'Test User'
    },
    _id: 'objectid'
  }
}];
let fixture;
let component;

describe('AdminBlogListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminBlogListComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: {navigate: function() {}}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: Observable.from([1]),
            snapshot: {
              data: {resolveData: {blogEntries: blogListStub}},
              queryParams: {limit: 10, sort: '-created', skip: 0}
            }
          }
        },
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: BlogService,
          useValue: {getBlogList: function() {}}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AdminBlogListComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnDestroy = function() {};
  });

});
