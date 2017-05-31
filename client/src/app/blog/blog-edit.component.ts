import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../user/auth.service';
import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html'
})
export class BlogEditComponent implements OnInit, OnDestroy {
  public blogEditForm: FormGroup;
  public blogEntry;
  private _isBeingSaved = false;

  constructor(
    public authService: AuthService,
    public blogService: BlogService,
    public location: Location,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  public editBlogEntry(): void {
    const editedEntry: BlogEntry = this.blogEditForm.value;
    editedEntry._id = this.blogEntry._id;
    this._isBeingSaved = true;
    this.blogService.updateBlogEntry(editedEntry);
  }

  canDeactivate() {
    const formValues = this.blogEditForm.value;
    const valuesUnchanged = formValues.title === this.blogEntry.title
      && formValues.content === this.blogEntry.content;

    if (valuesUnchanged || this._isBeingSaved) {
      return true;
    }

    return window.confirm('Discard changes?');
  }

  ngOnInit() {
    this.blogEntry = this._route.snapshot.data['resolveData'];
    this.blogEditForm = this._fb.group({
      'title': [this.blogEntry.title, Validators.required],
      'content': [this.blogEntry.content, Validators.required]
    });
  }

  ngOnDestroy() {
    this.blogService.error = null;
  }
}
