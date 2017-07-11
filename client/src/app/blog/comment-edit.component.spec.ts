import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Comment } from './comment';
import { BlogEntry } from './blog-entry';
import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { CommentEditComponent } from './comment-edit.component';
import { User } from '../user/user';

describe('CommentEditComponent', () => {
  let component: CommentEditComponent;
  let fixture: ComponentFixture<CommentEditComponent>;
  const user = {
    email: 'test@test.com',
    _id: 'userobjectid',
  };
  const comment: Comment  = {
    content: 'Test comment content'
  };
  const blogEntry: BlogEntry = {
    title: 'Test entry',
    content: 'Test entry content',
    _id: 'blogobjectid'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentEditComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user: () => user
          }
        },
        {
          provide: BlogService,
          useValue: {
            updateComment: (updatedComment: Comment) => Observable.from([1]),
            createComment: (newComment: Comment, selectedBlogEntry: BlogEntry) =>
              Observable.from([1])
          }
        },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('has a commentForm formgroup', () => {
      expect(component.commentForm instanceof FormGroup).toBe(true);
    });

    it('loads commentForm with empty values if no comment input', () => {
      expect(component.commentForm.value.content).toBe('');
    });

    it('loads commentForm with input comment', () => {
      component.comment = comment;
      component.ngOnInit();
      expect(component.commentForm.value.content).toBe(comment.content);
    });

    it('loads commentForm hidden user value with user id', () => {
      const authService = TestBed.get(AuthService);
      component.ngOnInit();
      expect(component.commentForm.value.user).toBe(authService.user()._id);
    });
  });

  describe('#cancel()', () => {
    it('emits event for onCommentCancel output', () => {
      spyOn(component.onCommentCancel, 'emit');
      component.cancel();
      fixture.detectChanges();
      expect(component.onCommentCancel.emit).toHaveBeenCalled();
    });
  });

  describe('#saveComment()', () => {
    let blogService: BlogService;

    beforeEach(() => {
      blogService = TestBed.get(BlogService);
      component.commentForm.setValue({...comment, user: user._id});
    });

    it('calls blogService.createComment() for new comments', () => {
      spyOn(blogService, 'createComment').and.callThrough();
      component.blogEntry = blogEntry;
      component.isNew = true;
      component.ngOnInit();
      component.saveComment();
      expect(blogService.createComment)
        .toHaveBeenCalledWith(component.commentForm.value, component.blogEntry);
    });

    it('calls blogService.updateComment() for non-new comments', () => {
      spyOn(blogService, 'updateComment').and.callThrough();
      component.isNew = false;
      component.ngOnInit();
      component.saveComment();
      expect(blogService.updateComment)
        .toHaveBeenCalledWith(component.commentForm.value);
    });
  });
});
