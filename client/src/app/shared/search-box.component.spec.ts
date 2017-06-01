import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        SearchBoxComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnInit();
  });

  afterEach(() =>  {
    component.ngOnDestroy();
  });

  it('loads the searchbox component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with searchForm FormGroup', () => {
    expect(component.searchForm instanceof FormGroup).toBe(true);
  });

  it('initializes searchForm with input searchTerm', () => {
    const testSearchTerm = 'test search term';
    component.searchTerm = testSearchTerm;
    component.ngOnInit();
    expect(component.searchForm.controls['searchTerm'].value)
      .toBe(testSearchTerm);
  });

  describe('searchChanged output', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() =>  {
      jasmine.clock().uninstall();
    });

    it('does not return form input value less than minlength after debounce'
      + 'time', () => {
      const inputText = 'th';
      let outputValue;
      component.searchChanged
        .subscribe(searchTerm => outputValue = searchTerm);
      component.searchForm.controls['searchTerm'].setValue(inputText);
      jasmine.clock().tick(501);
      expect(outputValue).toBe(undefined);
    });

    it('does not return form input value greater than minlength before'
      + 'debounce time', () => {
      const inputText = 'this is a test';
      let outputValue;
      component.searchChanged
        .subscribe(searchTerm => outputValue = searchTerm);
      component.searchForm.controls['searchTerm'].setValue(inputText);
      jasmine.clock().tick(400);
      expect(outputValue).toBe(undefined);
    });

    it('does return form input value greater than minlength (3 default) after'
      + 'debounce time (500ms default)', () => {
      const inputText = 'this is a test';
      let outputValue;
      component.searchChanged
        .subscribe(searchTerm => outputValue = searchTerm);
      component.searchForm.controls['searchTerm'].setValue(inputText);
      jasmine.clock().tick(501);
      expect(outputValue).toEqual({searchTerm: inputText});
    });

    it('does return form input value greater than input minlength after input'
      + 'debounce time', () => {
      component.minlength = 1;
      component.debounce = 100;
      fixture.detectChanges();
      const inputText = 'th';
      let outputValue;
      component.searchChanged
        .subscribe(searchTerm => outputValue = searchTerm);
      component.searchForm.controls['searchTerm'].setValue(inputText);
      jasmine.clock().tick(105);
      expect(outputValue).toEqual({searchTerm: inputText});
    });
  });
});
