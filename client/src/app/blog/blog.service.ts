import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { BlogEntry } from './blog-entry';
import { Comment } from './comment';

@Injectable()
export class BlogService {
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
  public deleteBlogEntry(entry: BlogEntry): Observable<any> {
    return this._authHttp.delete('/api/blog/' + entry.slug)
      .map(res => res.json());
  }

  /**
   * Get blog entry using slug
   * @param {String} slug - Slug made from blog title
   * @return {Promise<BlogEntry>} blogEntry - Promise resolving to blogEntry or []
   */
  public getBlogEntryBySlug(slug: string): Promise<BlogEntry> {
    return this._http.get('/api/blog/' + slug)
      .map(res => res.json())
      .toPromise();
  }

  /**
   * Get blog list. Uses arrow function format for this binding so it can work
   * when passed into component inputs.
   * @param {Object} params - Params for filtering blog list
   * @return {Promise<any>} blogList - Promise resolving to blogEntries, count, skip
   */
  public getList = (params: any): Promise<any> => {
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
        items: res.blogs,
        count: res.count,
        skip: searchParams.skip
      }))
      .toPromise();
  }

  /**
   * Update blog entry
   * @param {BlogEntry} entry - Blog entry
   * @return {Observable<BlogEntry>} blog entry
   */
  public updateBlogEntry(entry: BlogEntry): void {
    delete entry.comments;

    this._authHttp.put('/api/blog/' + entry.slug, entry)
      .map(res => res.json())
      .subscribe(blogEntry => {
        this._router.navigate(['/blog', blogEntry.slug]);
      }, err => this.error = JSON.parse(err._body).msg || err.statusText);
  }

  /**
   * Create new comment for a blog entry.
   * @param {BlogEntry} entry - Blog entry
   * @return {Observable<BlogEntry>} blog entry
   */
  public createComment(comment: Comment, blogEntry: BlogEntry): Observable<Comment> {
    return this._authHttp.post(`/api/blog/${blogEntry._id}/comment`, comment)
      .map(res => res.json());
  }

  /**
   * Delete comment.
   * @param {Comment} comment - Comment
   * @return {Observable<any>}
   */
  public deleteComment(comment: Comment): Observable<any> {
    return this._authHttp.delete('/api/comment/' + comment._id)
      .map(res => res.json());
  }

  /**
   * Get comment by id.
   * @param {String} id - Comment id
   * @return {Observable<Comment>} comment
   */
  public getCommentById(id: string): Observable<Comment> {
    return this._authHttp.get('/api/comment/' + id)
      .map(res => res.json());
  }

  /**
   * Update comment
   * @param {Comment} comment - Comment
   * @return {Observable<Comment>} comment
   */
  public updateComment(comment: Comment): Observable<Comment> {
    return this._authHttp.put('/api/comment/' + comment._id, comment)
      .map(res => res.json());
  }
}
