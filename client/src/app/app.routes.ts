import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add lazy-loaded routes/modules here
const APP_ROUTES: Routes = [
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
