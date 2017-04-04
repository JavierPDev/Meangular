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
    component.ngOnInit();
  });

  it('creates a blogCreateForm FormGroup', () => {
    expect(component.blogCreateForm instanceof FormGroup).toBe(true);
  });

  it('initializes form with blanks', () => {
    expect(component.blogCreateForm.value.title).toEqual('');
    expect(component.blogCreateForm.value.content).toEqual('');
  });

  it('calls BlogService createBlogEntry method for component method', () => {
    const newFormValues = {
      title: 'test title',
      content: 'test content'
    };
    const blogService = TestBed.get(BlogService);
    spyOn(blogService, 'createBlogEntry');
    component.blogCreateForm.patchValue(newFormValues);
    component.createBlogEntry();
    expect(blogService.createBlogEntry)
      .toHaveBeenCalledWith(newFormValues);
  });

  describe('#canDeactivate', () => {
    beforeAll(() => {
      // Mock confirm so test can proceed without interaction
      // Simulates user clicking cancel on browser confirm prompt
      spyOn(window, 'confirm').and.returnValue(false);
    });

    it('allows deactivation if inputs are unchanged', () => {
      expect(component.canDeactivate()).toBe(true);
    });

    it('disallows deactivation if inputs are changed but blog entry not created',
       () => {
      const title = 'changed title';
      const content = 'changed content';
      component.blogCreateForm.patchValue({content, title});
      expect(component.canDeactivate()).toBe(false);
    });

    it('allows deactivation if inputs changed & blog entry is created', () => {
      const title = 'changed title';
      const content = 'changed content';
      component.blogCreateForm.patchValue({content, title});
      component.createBlogEntry();
      expect(component.canDeactivate()).toBe(true);
    });
  });
});
