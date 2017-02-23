import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { BlogService } from './blog.service';

@Injectable()
export class BlogListResolver implements Resolve<any> {
  constructor(private _router: Router, private _blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._blogService.getBlogList()
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
