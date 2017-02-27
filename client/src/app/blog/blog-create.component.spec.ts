/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BlogCreateComponent } from './blog-create.component';
import { BlogService } from './blog.service';

let fixture;
let component;

describe('BlogCreateComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        BlogCreateComponent
      ],
      providers: [
        {
          provide: BlogService,
          useValue: {
            createBlogEntry: (blogEntry) => blogEntry
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(BlogCreateComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('creates a blogCreateForm FormGroup', () => {
    component.ngOnInit();
    expect(component.blogCreateForm instanceof FormGroup).toBe(true);
  });

  it('initializes form with blanks', () => {
    component.ngOnInit();
    expect(component.blogCreateForm.value.title).toEqual('');
    expect(component.blogCreateForm.value.content).toEqual('');
  });

  it('calls BlogService createBlogEntry method for component method', () => {
    const newFormValues = {
      title: 'test title',
      content: 'test content'
    };
    component.ngOnInit();
    spyOn(component._blogService, 'createBlogEntry');
    component.blogCreateForm.patchValue(newFormValues);
    component.createBlogEntry();
    expect(component._blogService.createBlogEntry)
      .toHaveBeenCalledWith(newFormValues);
  });
});
