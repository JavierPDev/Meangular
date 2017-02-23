import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from './blog.service';
import { BlogEntry } from './blog-entry';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html'
})
export class BlogEditComponent implements OnInit {
  public blogEditForm: FormGroup;
  public blogEntry;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _blogService: BlogService
  ) {}

  public editBlogEntry(): void {
    const editedEntry: BlogEntry = this.blogEditForm.value;
    editedEntry._id = this.blogEntry._id;
    this._blogService.updateBlogEntry(editedEntry);
  }

  ngOnInit() {
    this.blogEntry = this._activateRoute.snapshot.data['blogEntry'];
    this.blogEditForm = this._fb.group({
      'title': [this.blogEntry.title, Validators.required],
      'content': [this.blogEntry.content, Validators.required]
    });
  }
}
