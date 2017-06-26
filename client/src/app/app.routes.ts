import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Route, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Add lazy-loaded routes/modules here
const APP_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule',
    data: {
      preload: true
    }
  }
];

// Custom preloading strategy. Preloads routes with data: {preload: true}
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data['preload'] ? load() : Observable.of(null);
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: CustomPreloadingStrategy
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CustomPreloadingStrategy
  ]
})
export class AppRoutingModule {}
