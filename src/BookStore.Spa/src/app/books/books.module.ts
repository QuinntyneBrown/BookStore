import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { BookPageComponent } from './book-page.component';
import { BooksPageComponent } from './books-page.component';
import { BookService } from './book.service';
import { DigitalAssetsModule } from '../digital-assets/digital-assets.module';
import { EditBookOverlayComponent } from './edit-book-overlay.component';
import { EditBookOverlay } from './edit-book-overlay';
import { HttpClientModule } from '@angular/common/http';

const declarations = [
  BookPageComponent,
  BooksPageComponent,
  EditBookOverlayComponent
];

const entryComponents = [
  EditBookOverlayComponent
];

const providers = [
  BookService,
  EditBookOverlay
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
    DigitalAssetsModule,
    SharedModule	
  ],
  providers,
})
export class BooksModule { }
