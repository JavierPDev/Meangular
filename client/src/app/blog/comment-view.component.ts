import { Component, Input } from '@angular/core';

import { AuthService } from '../user/auth.service';
import { BlogEntry } from './blog-entry';
import { Comment } from './comment';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html'
})
export class CommentViewComponent {
  @Input() blogEntry: BlogEntry;
  @Input() comment: Comment;
  public commentIsBeingEdited = false;

  constructor(
    public auth: AuthService
  ) {}

  public onCommentCancel(): void {
    this.commentIsBeingEdited = false;
  }
}
