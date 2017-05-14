import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from './admin.service';
import { AuthService } from '../user/auth.service';
import { BlogEntry } from '../blog/blog-entry';

@Component({
  selector: 'app-blog-list',
  templateUrl: './admin-blog-list.component.html'
})
export class AdminBlogListComponent implements OnInit, OnDestroy {
  public blogEntries: Array<BlogEntry>;
  public count: number;
  public currentStart: number;
  public currentEnd: number;
  public currentPage: number;
  public limit = 20;
  public queryParams;
  public searchTerm: string;
  public sort = '-created';
  private _queryParamsSub;

  constructor(
    public auth: AuthService,
    public adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  /**
   * Change page. Used by pagination component and by selects' (change) output.
   * @param {Object} options - Pagination options
   */
  public changePage(options?: any): void {
    const page = options ? options.page : 1;
    const newSearch = options && (options.search || options.search === '')
      ? options.search : null;
    const oldParams = Object.assign({}, this.queryParams);
    const newParams: any = {page, sort: this.sort, limit: this.limit};
    const queryParams: any = Object.assign({}, oldParams, newParams);

    if (newSearch) {
      queryParams.search = newSearch;
      queryParams.page = 1;
    } else if (newSearch === '') {
      delete queryParams.search;
    }

    this.searchTerm = queryParams.search;
    this.currentPage = queryParams.page;
    this._router.navigate(['/admin/blog/list'], {queryParams});
  }

  private _setPageData(blogListData: any): void {
    const {
      count,
      blogEntries,
      limit,
      sort,
      search
    } = blogListData;
    let {
      skip,
      page
    } = blogListData;
    skip = skip || 0;
    page = page - 1 || 0;
    this.blogEntries = blogEntries;
    this.count = count;
    this.limit = limit || this.limit;
    this.sort = sort || this.sort;
    this.currentPage = page + 1;
    this.currentStart = count > 0 ? skip + 1 : 0;
    this.currentEnd = this.currentStart > 0 ? skip + blogEntries.length : 0;
  }

  ngOnInit() {
    // Watch for route query param changes to get blog list and set page data
    this._queryParamsSub = this._route.queryParams
      .subscribe(qp => {
        const queryParams: any = Object.assign({}, qp);
        this.queryParams = queryParams;

        if (queryParams.search) {
          this.searchTerm = queryParams.search;
        }

        // If navigating back to default blog list page 1 while already on blog
        // list, reset everything.
        if (!queryParams.search && !queryParams.page
            && !queryParams.sort && !queryParams.limit) {
          this.searchTerm = '';
          this.currentPage = 1;
          this.sort = '-created';
          this.limit = 20;
        }

        this.adminService.getBlogList(queryParams)
          .then(blogList => {
            this._setPageData(Object.assign(blogList, queryParams));
          }, err => this.adminService.error = err);
      });
  }

  ngOnDestroy() {
    this._queryParamsSub.unsubscribe();
  }
}
