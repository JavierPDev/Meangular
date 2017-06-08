import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { Comment } from './comment';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit, OnDestroy {
  public blogEntry: BlogEntry;
  public newCommentIsBeingEntered = false;

  constructor(
    public auth: AuthService,
    public blogService: BlogService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  public deleteBlogEntry(): void {
    this.blogService.deleteBlogEntry(this.blogEntry)
      .subscribe(() => {
        this._router.navigate(['/blog/list']);
      }, err => this.blogService.error = JSON.parse(err._body).msg || err.statusText);
  }

  public onCommentCancel(): void {
    this.newCommentIsBeingEntered = false;
  }

  public onCommentDeleteSuccess(index: number): void {
    this.blogEntry.comments.splice(index, 1);
  }

  public onCommentSave(comment: Comment): void {
    this.newCommentIsBeingEntered = false;
    this.blogEntry.comments.push(comment);
  }

  ngOnInit() {
    // Get blog entry data from route resolve
    this.blogEntry = this._route.snapshot.data['resolveData'];
  }

  ngOnDestroy() {
    this.blogService.error = null;
  }
}
