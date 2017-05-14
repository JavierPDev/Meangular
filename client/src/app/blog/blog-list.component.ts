import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/skip';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit, OnDestroy {
  public blogEntries: Array<BlogEntry>;
  public count: number;
  public currentStart: number;
  public currentEnd: number;
  public currentPage: number;
  public limit = 20;
  public queryParams;
  public searchTerm: string;
  public sort = '-created';
  protected _url = '/blog/list';
  protected _queryParams: Subscription;

  constructor(
    public auth: AuthService,
    public blogService: BlogService,
    protected _route: ActivatedRoute,
    protected _router: Router
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
    this._router.navigate([this._url], {queryParams});
  }

  protected _setPageData(blogListData: any): void {
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

  protected _getBlogListOnQueryParamChange(skip: number): void {
    // Watch for route query param changes to get blog list and set page data
    this._queryParams = this._route.queryParams
      .skip(skip)
      .subscribe(qp => {
        const queryParams: any = Object.assign({}, qp);
        this.queryParams = queryParams;

        // If navigating back to default blog list page 1 while already on blog
        // list, reset everything.
        if (!queryParams.search && !queryParams.page
            && !queryParams.sort && !queryParams.limit) {
          this.searchTerm = '';
          this.currentPage = 1;
          this.sort = '-created';
          this.limit = 20;
        }

        this.blogService.getBlogList(queryParams)
          .then(blogList => {
            this._setPageData(Object.assign(blogList, queryParams));
          }, err => this.blogService.error = err);
      });
  }

  ngOnInit() {
    // Get initial blog list data from route resolve so no empty page for user
    // at first page load
    const blogListData = this._route.snapshot.data['resolveData'];
    this.queryParams = this._route.snapshot.queryParams;
    this._setPageData(Object.assign(blogListData, this.queryParams));

    if (this.queryParams.search) {
      this.searchTerm = this.queryParams.search;
    }

    this._getBlogListOnQueryParamChange(1);
  }

  ngOnDestroy() {
    this._queryParams.unsubscribe();
  }
}
