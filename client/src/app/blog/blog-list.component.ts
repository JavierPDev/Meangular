import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { BlogEntry } from './blog-entry';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  public blogEntries: [BlogEntry];

  constructor(
    public auth: AuthService,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get blog list data from route resolve 
    this.blogEntries = this._activateRoute.snapshot.data['blogList'];
  }
}
