import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Book } from "./book.model";
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  constructor(
    private _client: HttpClient
  ) { }

  public get(): Observable<Array<Book>> {
    return this._client.get<{ books: Array<Book> }>(`${this._baseUrl}api/books`)
      .pipe(
        map(x => x.books)
      );
  }

  public getById(options: { bookId: string }): Observable<Book> {
    return this._client.get<{ book: Book }>(`${this._baseUrl}api/books/${options.bookId}`)
      .pipe(
        map(x => x.book)
      );
  }

  public remove(options: { book: Book }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/books/${options.book.bookId}`);
  }

  public upsert(options: { book: Book }): Observable<{ bookId: string }> {
    return this._client.post<{ bookId: string }>(`${this._baseUrl}api/books`, { book: options.book });
  }

  private get _baseUrl() { return environment.baseUrl; }
}
