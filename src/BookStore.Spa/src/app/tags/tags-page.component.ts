import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { TagService } from './tag.service';
import { TagUpsertOverlay } from './tag-upsert-overlay';
import { MatTableDataSource } from '@angular/material';
import { Tag } from './tag.model';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: "./tags-page.component.html",
  styleUrls: ["./tags-page.component.css"],
  selector: "app-tags-page"
})
export class TagsPageComponent { 
  constructor(
    private _tagService: TagService,
    private _tagUpsertOverlay: TagUpsertOverlay
  ) {

  }

  public dataSource = new MatTableDataSource<Tag>([]);

  public readonly columnsToDisplay: string[] = ['tagId', 'name', 'edit', 'delete'];

  ngOnInit() {
    this._tagService
    .get()
    .pipe(
      tap(x => {
        this.dataSource = new MatTableDataSource<Tag>(x);
        this.tags$.next(x);
      })
    ).subscribe();
  }

  public onCreate() {
    this.createUpsertOverlay();
  }

  public onEdit(tag: Tag) {
    this.createUpsertOverlay(tag);
  }

  public onDelete(tag: Tag) {
    this._tagService.remove({ tag })
      .subscribe(() => {
        let data = this.dataSource.data.slice(0);
        let idx = data.findIndex(x => x.tagId == tag.tagId);
        data.splice(idx, 1);
        this.dataSource = new MatTableDataSource<Tag>(data);
      });
  }

  public createUpsertOverlay(tag: Tag = <Tag>{}) {
    this._tagUpsertOverlay.create({
      source: {
        tagId: tag.tagId
      }
    })
      .pipe(
        tap(result => {

          if (!result) return;

          let data = this.dataSource.data.slice(0);

          let idx = data.findIndex(x => x.tagId == result.tagId);

          if (idx == -1) {
            data.push(result);
          } else {
            data[idx] = result;
          }

          this.dataSource = new MatTableDataSource<Tag>(data);
          this.tags$.next(data);
        }),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public tags$:BehaviorSubject<Tag[]> = new BehaviorSubject([]);
}
