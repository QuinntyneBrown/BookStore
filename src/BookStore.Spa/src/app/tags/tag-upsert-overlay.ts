import { Injectable, Injector } from "@angular/core";
import { OverlayService } from "../core/overlay.service";
import { OverlayRefProvider } from "../core/overlay-ref-provider";
import { TagUpsertOverlayComponent } from "./tag-upsert-overlay.component";

@Injectable()
export class TagUpsertOverlay extends OverlayService<TagUpsertOverlayComponent> {
  constructor(
    public injector: Injector,
    public overlayRefProvider: OverlayRefProvider
  ) {
    super(injector, overlayRefProvider, TagUpsertOverlayComponent);
  }
}
