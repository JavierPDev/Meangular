/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BlogListComponent } from './blog-list.component';
import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';

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

describe('BlogListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BlogListComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: {navigate: function() {}}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: Observable.from([1])
            snapshot: {
              data: {blogList: {blogEntries: blogListStub}},
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
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('loads the blog list component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with blog list from route resolve', () => {
    component.ngOnInit();
    expect(component.blogEntries).toEqual(blogListStub);
  });
});
