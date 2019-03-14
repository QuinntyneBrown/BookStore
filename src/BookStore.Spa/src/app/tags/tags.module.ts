import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { TagsPageComponent } from './tags-page.component';
import { TagUpsertOverlayComponent } from './tag-upsert-overlay.component';
import { TagService } from './tag.service';
import { TagUpsertOverlay } from './tag-upsert-overlay';

const declarations = [
  TagsPageComponent,
  TagUpsertOverlayComponent
];

const entryComponents = [
  TagUpsertOverlayComponent
];

const providers = [
  TagService,
  TagUpsertOverlay
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
export class TagsModule { }
