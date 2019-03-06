import { Component } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.css"],
  selector: "app-book-page"
})
export class BookPageComponent { 

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
