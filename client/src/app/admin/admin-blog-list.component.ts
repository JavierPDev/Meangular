import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { BlogEntry } from '../blog/blog-entry';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-admin-blog-list',
  templateUrl: './admin-blog-list.component.html'
})
export class AdminBlogListComponent {
  public sortFields = [
    {displayName: 'Created', fieldName: 'created'},
    {displayName: 'Title', fieldName: 'title'}
  ];

  constructor(
    public auth: AuthService,
    public blogService: BlogService,
    private _route: ActivatedRoute,
    private _router: Router
   ) {}

  public deleteBlogEntry(entry: BlogEntry): void {
    this.blogService.deleteBlogEntry(entry)
      .subscribe(() => {
        const queryParams: any = Object.assign({}, this._route.snapshot.queryParams);
        queryParams.cache = new Date().valueOf();
        // Navigate to same url with cache buster to trigger results update
        this._router.navigate([], {queryParams, skipLocationChange: true});
      }, err => this.blogService.error = JSON.parse(err._body).msg || err.statusText);
  }
}

