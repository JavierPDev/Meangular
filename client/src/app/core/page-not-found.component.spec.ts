/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageNotFoundComponent
      ]
    });
    TestBed.compileComponents();
  });

  it('loads the page not found component', () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
