import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit, OnDestroy {
  public blogEntry: BlogEntry;

  constructor(
    public auth: AuthService,
    public blogService: BlogService,
    private _activateRoute: ActivatedRoute
  ) {}

  public deleteBlogEntry(): void {
    this.blogService.deleteBlogEntry(this.blogEntry);
  }

  ngOnInit() {
    // Get blog entry data from route resolve
    this.blogEntry = this._activateRoute.snapshot.data['blogEntry'];
  }

  ngOnDestroy() {
    this.blogService.error = null;
  }
}
