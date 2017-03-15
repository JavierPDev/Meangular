import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { BlogService } from './blog.service';

@Injectable()
export class BlogListResolver implements Resolve<any> {
  constructor(private _router: Router, private _blogService: BlogService) {}

  // Resolve is used just for the initial page load of /blog/list so
  // user doesn't wait with an unfilled screen
  resolve(route: ActivatedRouteSnapshot) {
    const queryParams = route.queryParams;

    return this._blogService.getBlogList(queryParams)
      .then(blogList => {
        if (blogList) {
          return blogList;
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
