import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html'
})
export class BlogCreateComponent implements OnInit, OnDestroy {
  public blogCreateForm: FormGroup;
  private _isBeingSaved = false;

  constructor(
    public blogService: BlogService,
    public location: Location,
    private _fb: FormBuilder
  ) {}

  public createBlogEntry(): void {
    this._isBeingSaved = true;
    this.blogService.createBlogEntry(this.blogCreateForm.value);
  }

  canDeactivate() {
    const formValues = this.blogCreateForm.value;
    const valuesUnchanged = formValues.title === '' && formValues.content === '';

    if (valuesUnchanged || this._isBeingSaved) {
      return true;
    }

    return window.confirm('Discard changes?');
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
