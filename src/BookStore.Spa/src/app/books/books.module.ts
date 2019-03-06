import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BookPageComponent } from './book-page.component';
import { BooksPageComponent } from './books-page.component';

const declarations = [
  BookPageComponent,
  BooksPageComponent
];

const entryComponents = [

];

const providers = [

];

@NgModule({
  declarations,
  entryComponents,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    CoreModule,
    SharedModule	
  ],
  providers,
})
export class BooksModule { }
