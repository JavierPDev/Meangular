import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Add misc app routes here
const APP_ROUTES: Routes = [
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
