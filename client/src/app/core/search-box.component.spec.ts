import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
  });

  it('loads the searchbox component', () => {
    expect(component).toBeTruthy();
  });
});
