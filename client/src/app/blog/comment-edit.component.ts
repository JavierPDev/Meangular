import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { Comment } from './comment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html'
})
export class CommentEditComponent implements OnInit {
  @Input() blogEntry: BlogEntry;
  @Input() comment = new Comment('');
  /*
   * Whether comment is new and being created or old and being edited.
   */
  @Input() isNew: boolean;
  @Output() onCommentSaveSuccess = new EventEmitter();
  @Output() onCommentDeleteSuccess = new EventEmitter();
  @Output() onCommentCancel = new EventEmitter();
  public commentForm: FormGroup;
  public error: string;

  constructor(
    public auth: AuthService,
    private _blogService: BlogService,
    private _fb: FormBuilder
  ) {}

  public cancel(): void {
    this.onCommentCancel.emit();
  }

  public saveComment(): void {
    if (this.isNew) {
      this._createComment();
    } else {
      this._updateComment();
    }
  }

  private _createComment(): void {
    console.log('createcomment');
    this._blogService.createComment(this.commentForm.value, this.blogEntry)
      .subscribe(
        (comment: Comment) => this.onCommentSaveSuccess.emit(comment),
        err => this.error = JSON.parse(err._body).msg || err.statusText
      );
  }

  private _updateComment(): void {
    const comment = this.commentForm.value;
    comment._id = this.comment._id;

    this._blogService.updateComment(comment)
      .subscribe(
        (updatedComment: Comment) => this.onCommentSaveSuccess.emit(updatedComment),
        err => this.error = JSON.parse(err._body).msg || err.statusText
      );
  }

  ngOnInit() {
    this.commentForm = this._fb.group({
      content: [this.comment.content],
      user: [this.auth.user()._id]
    });
  }
}
