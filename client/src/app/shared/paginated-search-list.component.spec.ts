/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { PaginatedSearchListComponent } from './paginated-search-list.component';
import { AuthService } from '../user/auth.service';

let fixture;
let component: PaginatedSearchListComponent;

describe('PaginatedSearchListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginatedSearchListComponent
      ],
      providers: [
        {
          provide: Router,
          useValue: {navigate: function() {}}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: function() { return Observable.from([1]); },
            snapshot: {queryParams: {}}
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(PaginatedSearchListComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnDestroy = function() {};
  });

  it('loads the blog list component', () => {
    expect(component).toBeTruthy();
  });

  describe('changePage', () => {
    let queryParams;
    let router;

    beforeEach(() => {
      router = TestBed.get(Router);
      spyOn(router, 'navigate').and.callThrough();
    });

    it('navigates using existing route\'s params by default', () => {
      const route = TestBed.get(ActivatedRoute);
      expect(router.navigate).not.toHaveBeenCalled();
      delete queryParams.skip;
      component.changePage();
      expect(router.navigate)
        .toHaveBeenCalledWith([], {queryParams});
    });

    beforeEach(() => {
      component.limit = 20;
      component.sort = '-title';
      queryParams = {
        page: 1,
        sort: component.sort,
        limit: component.limit
      };
    });

    it('navigates using queryParams and default page (1)', () => {
      expect(router.navigate).not.toHaveBeenCalled();
      component.changePage();
      expect(router.navigate)
        .toHaveBeenCalledWith([], {queryParams});
    });

    it('navigates using queryParams and input page', () => {
      expect(router.navigate).not.toHaveBeenCalled();
      component.changePage({page: 5});
      queryParams.page = 5;
      expect(router.navigate)
        .toHaveBeenCalledWith([], {queryParams});
    });
  });
});
