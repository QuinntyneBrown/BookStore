import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksPageComponent } from './books/books-page.component';
import { TagsPageComponent } from './tags/tags-page.component';

const routes: Routes = [
  {
    path:"",
    component: BooksPageComponent    
  },
  {
    path:"tags",
    component: TagsPageComponent    
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
