import { NgModule } from '@angular/core';
import { AutoCompleteChipListComponent } from './auto-complete-chip-list.component';
import { MatInputModule, MatAutocompleteModule, MatIconModule, MatChipsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const declarations = [
  AutoCompleteChipListComponent
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ] 
})
export class AutoCompleteChipListModule {

}
