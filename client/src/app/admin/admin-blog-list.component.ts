import { Component, OnInit } from '@angular/core';

import { BlogListComponent } from '../blog/blog-list.component';
import { BlogEntry } from '../blog/blog-entry';

@Component({
  selector: 'app-admin-blog-list',
  templateUrl: './admin-blog-list.component.html'
})
export class AdminBlogListComponent extends BlogListComponent implements OnInit {
  protected _url = '/admin/blog/list';

  public deleteBlogEntry(entry: BlogEntry): void {
    this.blogService.deleteBlogEntry(entry)
      .subscribe(() => {
        const queryParams: any = Object.assign({}, this._route.snapshot.queryParams);
        queryParams.cache = new Date().valueOf();
        // Navigate to same url with cache buster to trigger results update
        this._router.navigate([this._url], {queryParams, skipLocationChange: true});
      }, err => this.blogService.error = JSON.parse(err._body).msg || err.statusText);
  }

  ngOnInit() {
    this._getBlogListOnQueryParamChange(0);
  }
}
