import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly _snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item: any) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar({
      message: "Book removed from reading list",
      action: "Undo",
      options: {
        duration :2000,
        verticalPosition: 'top'
      }
    }).onAction().subscribe((_) => this.store.dispatch(addToReadingList({book: item})))
  }

  openSnackBar(config: any){
    const { message, action, options} = config;
    return this._snackBar.open(message,action,options)
  }
}
