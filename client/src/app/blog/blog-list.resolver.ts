import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { BlogService } from './blog.service';

@Injectable()
export class BlogListResolver implements Resolve<any> {
  constructor(private _router: Router, private _blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const routeParams = route.queryParams;
    const queryParams = new URLSearchParams();
    for (const key in routeParams) {
      queryParams.set(key, routeParams[key]);
    }
    if (!queryParams['sort']) queryParams.set('sort', '-created');

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
