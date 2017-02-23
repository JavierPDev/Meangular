import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html'
})
export class BlogCreateComponent implements OnInit {
  public blogCreateForm: FormGroup;

  constructor(private _fb: FormBuilder, private _blogService: BlogService) {}

  public createBlogEntry(): void {
    this._blogService.createBlogEntry(this.blogCreateForm.value);
  }

  ngOnInit() {
    this.blogCreateForm = this._fb.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }
}
