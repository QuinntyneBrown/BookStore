import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { map, switchMap, tap, takeUntil } from "rxjs/operators";
import { OverlayRefWrapper } from '../core/overlay-ref-wrapper';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
  templateUrl: "./book-upsert-overlay.component.html",
  styleUrls: ["./book-upsert-overlay.component.css"],
  selector: "app-book-upsert-overlay",
  host: { 'class': 'mat-typography' }
})
export class BookUpsertOverlayComponent { 
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
            bookId: x.bookId,
            title: x.title            
          }))
        )
        .subscribe();       
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public book$: BehaviorSubject<Book> = new BehaviorSubject(<Book>{ });

  public bookId: string;

  public handleCancelClick() {
    this._overlay.close();
  }

  public form: FormGroup = new FormGroup({
    bookId: new FormControl("00000000-0000-0000-0000-000000000000",[]),
    title: new FormControl(null, [])  
  });

  public handleSave(book:Book) { 
    
    this._bookService.upsert({ book})    
    .pipe(map(x => {      
      book.bookId = x.bookId;
    }))
    .subscribe(_ => {
      this._overlay.close(book);
    });
  }
} 
