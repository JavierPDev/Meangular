import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CommentViewComponent } from './comment-view.component';
import { Comment } from './comment';
import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';

describe('CommentViewComponent', () => {
  let component: CommentViewComponent;
  let fixture: ComponentFixture<CommentViewComponent>;
  const comment: Comment = {
    content: 'Comment content',
    user: {
      email: 'test@user.com',
      _id: 'objectid',
      roles: [],
      profile: {name: 'Test User'}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user: () => ({_id: comment.user._id}),
            loggedIn: false,
            isAdmin: false
          }
        },
        {
          provide: BlogService,
          useValue: {
            deleteComment: (commentToDelete: Comment) => Observable.from([1]),
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentViewComponent);
    component = fixture.componentInstance;
    component.comment = comment;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#canEditDelete()', () => {
    it('returns false if user is not logged in', () => {
      expect(component.canEditDelete()).toBe(false);
    });

    it('returns false if user is not admin and not comment author', () => {
      component.comment.user._id = 'random';
      expect(component.canEditDelete()).toBe(false);
    });

    it('returns true if user is admin', () => {
      const authService = TestBed.get(AuthService);
      authService.loggedIn = true;
      authService.isAdmin = true;
      expect(component.canEditDelete()).toBe(true);
    });

    it('returns true if user is author of comment and not admin', () => {
      const authService = TestBed.get(AuthService);
      authService.loggedIn = true;
      authService.isAdmin = false;
      expect(component.canEditDelete()).toBe(true);
    });
  });

  describe('#deleteComment()', () => {
    let blogService: BlogService;

    beforeEach(() => {
      blogService = TestBed.get(BlogService);
    });

    it('calls blogService delete method with comment', () => {
      spyOn(blogService, 'deleteComment').and.callThrough();
      component.deleteComment();
      expect(blogService.deleteComment).toHaveBeenCalledWith(component.comment);
    });

    it('emits onDeleteSuccess event', () => {
      spyOn(component.onDeleteSuccess, 'emit');
      component.deleteComment();
      expect(component.onDeleteSuccess.emit).toHaveBeenCalled();
    });
  });

  describe('#onCommentCancel()', () => {
    it('sets commentIsBeingEdited to false', () => {
      component.commentIsBeingEdited = true;
      expect(component.commentIsBeingEdited).toBe(true);
      component.onCommentCancel();
      expect(component.commentIsBeingEdited).toBe(false);
    });
  });

  describe('#onCommentSave()', () => {
    it('sets commentIsBeingEdited to false', () => {
      component.commentIsBeingEdited = true;
      expect(component.commentIsBeingEdited).toBe(true);
      component.onCommentSave(component.comment);
      expect(component.commentIsBeingEdited).toBe(false);
    });

    it('sets component comment to argument comment', () => {
      const newComment = {...comment, title: 'arg comment'};
      component.comment.content = 'new content';
      expect(component.comment === newComment).toBe(false);
      component.onCommentSave(newComment);
      expect(component.comment === newComment).toBe(true);
    });
  });
});
