import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { tap, takeUntil } from 'rxjs/operators';
import { BookService } from './book.service';
import { BookUpsertOverlay } from './book-upsert-overlay';
import { Book } from './book.model';

@Component({
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
  selector: "app-books-page"
})
export class BooksPageComponent { 
  constructor(
    private readonly _bookService: BookService,
    private readonly _bookUpsertOverlay: BookUpsertOverlay
  ) { }

  public books$: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  ngOnInit() {
    this._bookService
      .get()
      .pipe(
        tap(x => {
          this.books$.next(x);
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public onCreate() {
    this.createUpsertOverlay();
  }

  public onEdit(book:Book) {
    this.createUpsertOverlay(book);
  }

  public onDelete(book:Book) {
    this._bookService.remove({book})
    .subscribe(() => {
      let data = this.books$.value.slice(0);      
      let idx = data.findIndex(x => x.bookId == book.bookId);
      data.splice(idx,1);
      this.books$.next(data);
    });
  }

  public onDestroy: Subject<void> = new Subject<void>();

  public createUpsertOverlay(book: Book = <Book>{}) {    
    this._bookUpsertOverlay.create({
      source: {
        bookId: book.bookId
      }
    })
    .pipe(
      tap(result => {
        
        if (!result) return;

        let data = this.books$.value.slice(0);

        let idx = data.findIndex(x => x.bookId == result.bookId);

        if (idx == -1) {
          data.push(result);
        } else {
          data[idx] = result;
        }

        this.books$.next(data);
      }),
      takeUntil(this.onDestroy)
    )
    .subscribe();
  }

  ngOnDestroy() { this.onDestroy.next(); }
}