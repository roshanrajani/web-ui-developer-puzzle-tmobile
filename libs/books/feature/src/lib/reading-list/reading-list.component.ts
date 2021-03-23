import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, updateMarkAsFinished, undoUpdateMarkAsFinished } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  checked: Boolean;

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  onFinishButtonClick(item) {
    this.store.dispatch(updateMarkAsFinished({ item }));

    let message = 'Marked Book as Finished';

    if (item.finished) {
      message = 'Removed Book as Finished';
    }

    let snackBarRef = this.snackBar.open(message, 'Undo', {
      duration: 5000
    });

    snackBarRef.onAction().subscribe(() => {
      item = {
        ...item,
        finished: !item.finished
      };
      this.store.dispatch(undoUpdateMarkAsFinished({ item }));
    });
  }
}
