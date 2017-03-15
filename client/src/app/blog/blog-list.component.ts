import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/skip';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  public blogEntries: [BlogEntry];
  public count: number;
  public currentStart: number;
  public currentEnd: number;
  public currentPage: number;
  public limit: number = 20;
  public sort: string = '-created';
  private _routeParams;

  constructor(
    public auth: AuthService,
    private _blogService: BlogService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  /**
   * Change page. Used by pagination component and by order select boxes.
   * @param {Object} evt - Optional event object from pagination output
   */
  public changePage(evt?): void {
    const page = evt ? evt.page : 1;
    const newParams = { page, sort: this.sort, limit: this.limit };
    const queryParams = Object.assign({}, this._routeParams, newParams);
    this._router.navigate(['/blog/list'], {queryParams});
  }

  private _setPageData(blogListData): void {
    let {
      count,
      blogEntries,
      limit,
      skip,
      page,
      sort
    } = blogListData;
    skip = skip || 0;
    page = page - 1 || 0
    this.blogEntries = blogEntries;
    this.count = count;
    this.limit = limit || this.limit;
    this.sort = sort || this.sort;
    this.currentPage = page + 1;
    this.currentStart = skip + 1;
    this.currentEnd = skip + blogEntries.length;
  }

  ngOnInit() {
    // Get initial blog list data from route resolve so no empty page for user
    // at first page load
    const blogListData = this._route.snapshot.data['blogList'];
    this._routeParams = this._route.snapshot.queryParams;
    this._setPageData(Object.assign(blogListData, this._routeParams));

    // Watch for page changes to get blog list and set page data
    this._route.queryParams
      .skip(1)
      .subscribe(routeParams => {
        this._routeParams = routeParams;
        this._blogService.getBlogList(routeParams)
          .then(blogList => {
            this._setPageData(Object.assign(blogList, routeParams));
          });
      });
  }
}
