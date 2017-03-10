import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html'
})
export class BlogCreateComponent implements OnInit, OnDestroy {
  public blogCreateForm: FormGroup;

  constructor(
    public blogService: BlogService,
    private _fb: FormBuilder
  ) {}

  public createBlogEntry(): void {
    this.blogService.createBlogEntry(this.blogCreateForm.value);
  }

  ngOnInit() {
    this.blogCreateForm = this._fb.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.blogService.error = null;
  }
}
