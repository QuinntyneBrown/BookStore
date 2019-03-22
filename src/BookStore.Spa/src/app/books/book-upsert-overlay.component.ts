import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";

import { map, switchMap, tap, takeUntil } from "rxjs/operators";
import { OverlayRefWrapper } from '../core/overlay-ref-wrapper';
import { BookService } from './book.service';
import { Book } from './book.model';
import { Tag } from '../tags/tag.model';
import { TagService } from '../tags/tag.service';

@Component({
  templateUrl: "./book-upsert-overlay.component.html",
  styleUrls: ["./book-upsert-overlay.component.css"],
  selector: "app-book-upsert-overlay",
  host: { 'class': 'mat-typography' }
})
export class BookUpsertOverlayComponent { 
  constructor(
    private _bookService: BookService,
    private _tagService: TagService,
    private _overlay: OverlayRefWrapper) { }

  ngOnInit() {
    if (this.bookId)
      this._bookService.getById({ bookId: this.bookId })
        .pipe(
          map(x => this.book$.next(x)),
          switchMap(x => this.book$),
          map(x => this.form.patchValue({
            bookId: x.bookId,
            name: x.name            
          }))
        )
        .subscribe();

        this._tagService.get()
        .pipe(takeUntil(this.onDestroy))
        .subscribe(x => this.items$.next(x));        
  }

  items$: BehaviorSubject<Tag[]> = new BehaviorSubject([]);

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public book$: BehaviorSubject<Book> = new BehaviorSubject(<Book>{ tags: []});
  
  selectedItems: any[] = this.book$.value.tags;

  public bookId: string;

  public handleCancelClick() {
    this._overlay.close();
  }

  public form: FormGroup = new FormGroup({
    bookId: new FormControl("00000000-0000-0000-0000-000000000000",[]),
    name: new FormControl(null, []), 
    tags: new FormControl()   
  });

  public handleSave(book:Book) {
    this._bookService.upsert({book})
    .pipe(map(x => {
      book.bookId = x.bookId;
    }))
    .subscribe(_ => {
      this._overlay.close(book);
    });
  }
} 