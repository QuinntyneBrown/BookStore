import { Component } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
  selector: "app-books-page"
})
export class BooksPageComponent { 

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
