import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { OverlayRefWrapper } from "../core/overlay-ref-wrapper";
import { BookService } from "./book.service";
import { Book } from "./book.model";
import { map, switchMap, tap, takeUntil } from "rxjs/operators";

@Component({
  templateUrl: "./edit-book-overlay.component.html",
  styleUrls: ["./edit-book-overlay.component.css"],
  selector: "app-edit-book-overlay",
  host: { 'class': 'mat-typography' }
})
export class EditBookOverlayComponent { 
  constructor(
    private _bookService: BookService,
    private _overlay: OverlayRefWrapper) { }

  ngOnInit() {
    if (this.bookId)
      this._bookService.getById({ bookId: this.bookId })
        .pipe(
          map(x => this.book$.next(x)),
          switchMap(x => this.book$),
          map(x => this.form.patchValue({
            name: x.name
          }))
        )
        .subscribe();
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public book$: BehaviorSubject<Book> = new BehaviorSubject(<Book>{});
  
  public bookId: string;

  public handleCancelClick() {
    this._overlay.close();
  }

  public handleSaveClick() {
    const book = new Book();
    book.bookId = this.bookId;
    book.name = this.form.value.name;
    this._bookService.create({ book })
      .pipe(
        map(x => book.bookId = x.bookId),
        tap(x => this._overlay.close(book)),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public form: FormGroup = new FormGroup({
    name: new FormControl(null, [])
  });
} 
