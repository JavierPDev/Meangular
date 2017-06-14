import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/skip';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent {
  public sortFields = [
    {displayName: 'Created', fieldName: 'created'},
    {displayName: 'Title', fieldName: 'title'}
  ];

  constructor(public auth: AuthService, public blogService: BlogService) {}
}
