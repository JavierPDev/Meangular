import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { Comment } from './comment';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html'
})
export class CommentViewComponent {
  @Input() blogEntry: BlogEntry;
  @Input() comment: Comment;
  @Output() onDeleteSuccess = new EventEmitter();
  public commentIsBeingEdited = false;
  public error: string;

  constructor(
    private _auth: AuthService,
    private _blogService: BlogService
  ) {}

  public canEditDelete(): boolean {
    if (!this._auth.loggedIn) {
      return false;
    }

    const isCommentAuthor = this._auth.user()._id === this.comment.user._id;
    const isBlogEntryAuthor = this._auth.user()._id === this.blogEntry.user._id;

    if (this._auth.isAdmin || isCommentAuthor || isBlogEntryAuthor) {
      return true;
    }

    return false;
  }

  public deleteComment(): void {
    this._blogService.deleteComment(this.comment)
      .subscribe(
        () => this.onDeleteSuccess.emit(),
        err => this.error = JSON.parse(err._body).msg || err.statusText
      );
  }

  public onCommentCancel(): void {
    this.commentIsBeingEdited = false;
  }

  public onCommentSave(comment: Comment): void {
    this.comment = comment;
    this.commentIsBeingEdited = false;
  }
}
