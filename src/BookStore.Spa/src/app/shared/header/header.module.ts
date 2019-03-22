import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';

const declarations = [
  HeaderComponent
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

    MatToolbarModule,
    RouterModule
  ],
  providers,
  exports: declarations
})
export class HeaderModule { }
