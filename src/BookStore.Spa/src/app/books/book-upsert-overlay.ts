import { Injectable, Injector } from "@angular/core";
import { OverlayService } from "../core/overlay.service";
import { OverlayRefProvider } from "../core/overlay-ref-provider";
import { BookUpsertOverlayComponent } from "./book-upsert-overlay.component";

@Injectable()
export class BookUpsertOverlay extends OverlayService<BookUpsertOverlayComponent> {
  constructor(
    public injector: Injector,
    public overlayRefProvider: OverlayRefProvider
  ) {
    super(injector, overlayRefProvider, BookUpsertOverlayComponent);
  }
}
