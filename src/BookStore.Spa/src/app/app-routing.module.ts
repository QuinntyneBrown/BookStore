import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksPageComponent } from './books/books-page.component';
import { MasterPageComponent } from './master-page.component';
import { DashboardPageComponent } from './dashboard/dashboard-page.component';

const routes: Routes = [
  {
    path:"",
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: DashboardPageComponent,
      }
    ]
  },  
  {
    path:"books",
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: BooksPageComponent,
      }
    ]     
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
