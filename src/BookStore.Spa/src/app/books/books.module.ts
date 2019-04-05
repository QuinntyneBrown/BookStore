import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BooksPageComponent } from './books-page.component';
import { BookService } from './book.service';
import { HttpClientModule } from '@angular/common/http';
import { BookUpsertOverlayComponent } from './book-upsert-overlay.component';
import { BookUpsertOverlay } from './book-upsert-overlay';

const declarations = [
  BooksPageComponent,
  BookUpsertOverlayComponent
];

const entryComponents = [
  BookUpsertOverlayComponent
];

const providers = [
  BookService,
  BookUpsertOverlay
];

@NgModule({
  declarations,
  entryComponents,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,

    CoreModule,
    SharedModule	
  ],
  providers,
})
export class BooksModule { }
