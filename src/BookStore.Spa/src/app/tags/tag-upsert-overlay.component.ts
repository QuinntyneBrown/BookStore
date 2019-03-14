import { Component } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { OverlayRefWrapper } from "../core/overlay-ref-wrapper";
import { TagService } from "./tag.service";
import { Tag } from "./tag.model";
import { map, switchMap, tap, takeUntil } from "rxjs/operators";

@Component({
  templateUrl: "./tag-upsert-overlay.component.html",
  styleUrls: ["./tag-upsert-overlay.component.css"],
  selector: "app-tag-upsert-overlay",
  host: { 'class': 'mat-typography' }
})
export class TagUpsertOverlayComponent { 
  constructor(
    private _tagService: TagService,
    private _overlay: OverlayRefWrapper) { }

  ngOnInit() {
    if (this.tagId)
      this._tagService.getById({ tagId: this.tagId })
        .pipe(
          map(x => this.tag$.next(x)),
          switchMap(x => this.tag$),
          map(x => this.form.patchValue({
            tagId: x.tagId,
            name: x.name
          }))
        )
        .subscribe();
  }

  public onDestroy: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();	
  }

  public tag$: BehaviorSubject<Tag> = new BehaviorSubject(<Tag>{});
  
  public tagId: string;

  public handleCancel() {
    this._overlay.close();
  }

  public handleSave() {
    const tag = new Tag();
    tag.tagId = this.tagId;
    tag.name = this.form.value.name;
    
    this._tagService.upsert({ tag })
      .pipe(
        map(x => tag.tagId = x.tagId),
        tap(x => this._overlay.close(tag)),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  public form: FormGroup = new FormGroup({
    tagId: new FormControl("00000000-0000-0000-0000-000000000000", []),
    name: new FormControl(null, []),
  });
} 
