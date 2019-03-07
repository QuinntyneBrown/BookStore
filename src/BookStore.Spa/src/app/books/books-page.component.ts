import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { BookService } from './book.service';
import { EditBookOverlay } from './edit-book-overlay';

@Component({
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
  selector: "app-books-page"
})
export class BooksPageComponent { 
  constructor(
    private readonly _bookService: BookService,
    private readonly _editBookOverlay: EditBookOverlay
  ) {

  }

  public ngAfterViewInit() {
    setTimeout(() =>{
        this._editBookOverlay
      .create()
      .subscribe();
    },1000)

  }
  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }
}
