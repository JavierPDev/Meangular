import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { BlogService } from './blog.service';

@Injectable()
export class BlogEntryResolver implements Resolve<any> {
  constructor(private _router: Router, private _blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    return this._blogService.getBlogEntryBySlug(slug)
      .then(blogEntry => {
        if (blogEntry) {
          return blogEntry;
        } else {
          this._router.navigate(['/404']);
          return null;
        }
      }, err => {
        this._router.navigate(['/404']);
        return null;
      });
  }
}
