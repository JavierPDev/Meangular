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
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _DOMTitleChangeSub;
  private _slimLoadingBarSub;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _slimLoadingBarService: SlimLoadingBarService,
    private _titleService: Title
  ) {}

  ngOnInit() {
    this._setupSlimLoadingBar();
    this._setupDOMTitleChanges();
  }

  ngOnDestroy() {
    this._slimLoadingBarSub.unsubscribe();
    this._DOMTitleChangeSub.unsubscribe();
  }

  /**
   * Subscribe to route changes and display slim loading bar depending on
   * navigation state.
   */
  private _setupSlimLoadingBar(): void {
    this._slimLoadingBarSub = this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._slimLoadingBarService.start();
      } else if (event instanceof NavigationEnd
        || event instanceof NavigationError
        || event instanceof NavigationCancel) {
        this._slimLoadingBarService.complete();
      }
    }, err => this._slimLoadingBarService.complete());
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
