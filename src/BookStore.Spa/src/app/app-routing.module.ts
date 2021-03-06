import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksPageComponent } from './books/books-page.component';
import { BookPageComponent } from './books/book-page.component';

const routes: Routes = [
  {
    path:"",
    component: BooksPageComponent    
  },
  {
    path:"book/:id",
    component: BookPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
