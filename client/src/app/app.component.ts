import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _DOMTitleChangeSub;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._setupDOMTitleChanges();
  }

  ngOnDestroy() {
    this._DOMTitleChangeSub.unsubscribe();
  }

  /**
   * Subscribe to route changes and update DOM title with route titles.
   */
  private _setupDOMTitleChanges(): void {
    const baseTitle = 'Meangular | ';

    this._DOMTitleChangeSub = this._router.events
      .filter(event => event instanceof NavigationEnd)
      .map(event => this._route)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .map(route => route.data['value'])
      .subscribe(data => {
        let title = baseTitle + data['title'];

        if (data.resolveData && data.resolveData.title) {
          title += ' ' + data.resolveData.title;
        }

        this._titleService.setTitle(title);
      });
  }
}
