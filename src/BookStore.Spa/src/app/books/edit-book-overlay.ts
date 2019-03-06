import { Injectable, Injector } from "@angular/core";
import { OverlayService } from "../core/overlay.service";
import { OverlayRefProvider } from "../core/overlay-ref-provider";
import { EditBookOverlayComponent } from "./edit-book-overlay.component";

@Injectable()
export class EditBookOverlay extends OverlayService<EditBookOverlayComponent> {
  constructor(
    public injector: Injector,
    public overlayRefProvider: OverlayRefProvider
  ) {
    super(injector, overlayRefProvider, EditBookOverlayComponent);
  }
}
