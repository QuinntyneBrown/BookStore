import { Component, ViewChild } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { MatTableDataSource } from '@angular/material';
import { tap, takeUntil, map } from 'rxjs/operators';
import { BookService } from './book.service';
import { BookUpsertOverlay } from './book-upsert-overlay';
import { Book } from './book.model';
import { IgxGridCommonModule, IgxGridComponent } from 'igniteui-angular';

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

  @ViewChild('booksGrid', { read: IgxGridComponent })
  public grid: IgxGridCommonModule;

  public dataSource = new MatTableDataSource<Book>([]);

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

  public readonly columnsToDisplay: string[] = ['bookId', 'name', 'edit', 'delete'];

  public onCreate() {
    this.createUpsertOverlay();
  }

  public onEdit(book:Book) {
    this.createUpsertOverlay(book);
  }

  public onDelete(book:Book) {
    this._bookService.remove({book})
    .subscribe(() => {
      let data = this.dataSource.data.slice(0);
      let idx = data.findIndex(x => x.bookId == book.bookId);
      data.splice(idx,1);
      this.dataSource = new MatTableDataSource<Book>(data);
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

        let data = this.dataSource.data.slice(0);

        let idx = data.findIndex(x => x.bookId == result.bookId);

        if (idx == -1) {
          data.push(result);
        } else {
          data[idx] = result;
        }

        this.dataSource = new MatTableDataSource<Book>(data);
      }),
      takeUntil(this.onDestroy)
    )
    .subscribe();
  }

  ngOnDestroy() { this.onDestroy.next(); }
}