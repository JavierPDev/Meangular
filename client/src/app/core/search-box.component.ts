import { Component, OnInit, OnDestroy, OnChanges, Input,
  Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public searchTerm = '';
  @Input('debounce') private _debounce = 500;
  @Input('minlength') private _minlength = 3;
  @Output('searchChanged') private _searchChanged = new EventEmitter();
  public searchForm: FormGroup;
  private _searchSub: Subscription;

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this._fb.group({searchTerm: [this.searchTerm]});
    this._searchSub = this.searchForm.controls['searchTerm'].valueChanges
      .debounceTime(this._debounce)
      .filter(val => val.length >= this._minlength || val === '')
      .subscribe(val => this._searchChanged.emit({searchTerm: val}));
  }

  ngOnDestroy() {
    this._searchSub.unsubscribe();
  }

  ngOnChanges(changes) {
    const searchTermChange = changes.searchTerm;

    if (!searchTermChange.firstChange) {
      this.searchForm.controls['searchTerm']
        .setValue(searchTermChange.currentValue, {emitEvent: false});
    }
  }
}
