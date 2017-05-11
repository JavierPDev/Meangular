import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { BlogEntry } from '../blog/blog-entry';

@Injectable()
export class AdminService {
  /**
   * Blog errors stored here for alerting to user
   */
  public error: string;

  constructor(
    private _authHttp: AuthHttp,
    private _http: Http,
    private _router: Router
  ) {}

  /**
   * Create blog entry
   * @param {BlogEntry} entry - Blog entry
   */
  public createBlogEntry(entry: BlogEntry): void {
    this._authHttp.post('/api/blog', entry)
      .map(res => res.json())
      .subscribe(blogEntry => {
        this._router.navigate(['/blog', blogEntry.slug]);
      }, err => this.error = JSON.parse(err._body).msg || err.statusText);
  }

  /**
   * Delete blog entry
   * @param {BlogEntry} entry - Blog entry
   */
  public deleteBlogEntry(entry: BlogEntry): void {
    this._authHttp.delete('/api/blog/' + entry._id)
      .map(res => res.json())
      .subscribe(() => {
        this._router.navigate(['/blog/list']);
      }, err => this.error = JSON.parse(err._body).msg || err.statusText);
  }

  /**
   * Get blog entry using slug
   * @param {String} slug - Slug made from blog title
   * @return {Promise<BlogEntry>} blogEntry - Promise resolving to blogEntry or []
   */
  public getBlogEntryBySlug(slug: string): Promise<BlogEntry> {
    const search = new URLSearchParams();
    search.set('slug', slug);
    search.set('limit', '1');
    return this._http.get('/api/blog', {search})
      .map(res => res.json())
      .map(res => res.blogs[0])
      .toPromise();
  }

  /**
   * Get blog list
   * @param {Object} params - Params for filtering blog list
   * @return {Promise<any>} blogList - Promise resolving to blogEntries, count, skip
   */
  public getBlogList(params: any): Promise<any> {
    const searchParams = Object.assign({}, params);

    if (searchParams.page) {
      searchParams.skip = searchParams.limit * (searchParams.page - 1);
      delete searchParams.page;
    }

    if (!searchParams.sort) {
      searchParams.sort = '-created';
    }

    const queryParams = new URLSearchParams();

    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        queryParams.set(key, searchParams[key]);
      }
    }

    return this._http.get('/api/blog', {search: queryParams})
      .map(res => res.json())
      .map(res => ({
        blogEntries: res.blogs,
        count: res.count,
        skip: searchParams.skip
      }))
      .toPromise();
  }

  /**
   * Update blog entry
   * @param {BlogEntry} entry - Blog entry
   */
  public updateBlogEntry(entry: BlogEntry): void {
    this._authHttp.put('/api/blog/' + entry._id, entry)
      .map(res => res.json())
      .subscribe(blogEntry => {
        this._router.navigate(['/blog', blogEntry.slug]);
      }, err => this.error = JSON.parse(err._body).msg || err.statusText);
  }
}
