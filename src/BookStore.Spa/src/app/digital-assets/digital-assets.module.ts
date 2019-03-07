import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DigitalAssetService } from './digital-asset.service';
import { DigitalAssetInputUrlComponent } from './digital-asset-url-input.component';
import { HttpClientModule } from '@angular/common/http';

const declarations = [
  DigitalAssetInputUrlComponent
];

const entryComponents = [
];

const providers = [
  DigitalAssetService
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
  exports:declarations
})
export class DigitalAssetsModule { }
