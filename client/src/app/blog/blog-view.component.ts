import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html'
})
export class BlogViewComponent implements OnInit {
  public blogEntry: BlogEntry;

  constructor(
    public auth: AuthService,
    private _activateRoute: ActivatedRoute,
    private _blogService: BlogService
  ) {}

  public deleteBlogEntry(): void {
    this._blogService.deleteBlogEntry(this.blogEntry);
  }

  ngOnInit() {
    // Get blog entry data from route resolve 
    this.blogEntry = this._activateRoute.snapshot.data['blogEntry'];
  }
}
