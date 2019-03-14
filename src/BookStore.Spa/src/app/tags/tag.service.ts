import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Tag } from "./tag.model";
import { environment } from 'src/environments/environment';

@Injectable()
export class TagService {
  constructor(
    private _client: HttpClient
  ) { }

  public get(): Observable<Array<Tag>> {
    return this._client.get<{ tags: Array<Tag> }>(`${this._baseUrl}api/tags`)
      .pipe(
        map(x => x.tags)
      );
  }

  public getById(options: { tagId: string }): Observable<Tag> {
    return this._client.get<{ tag: Tag }>(`${this._baseUrl}api/tags/${options.tagId}`)
      .pipe(
        map(x => x.tag)
      );
  }

  public remove(options: { tag: Tag }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/tags/${options.tag.tagId}`);
  }

  public upsert(options: { tag: Tag }): Observable<{ tagId: string }> {
    return this._client.post<{ tagId: string }>(`${this._baseUrl}api/tags`, { tag: options.tag });
  }

  private get _baseUrl() { return environment.baseUrl; }
}
