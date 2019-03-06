import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { BookService } from './book.service';

@Component({
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
  selector: "app-books-page"
})
export class BooksPageComponent { 
  constructor(
    private readonly _bookService: BookService
  ) {

  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
