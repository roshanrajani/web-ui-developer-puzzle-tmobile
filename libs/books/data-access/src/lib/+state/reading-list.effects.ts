import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { fetch, optimisticUpdate } from '@nrwl/angular';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  // Update(PUT) API added to mark book as Read.
  updateMarkAsFinished$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      ReadingListActions.updateMarkAsFinished,
      ReadingListActions.undoUpdateMarkAsFinished
    ),
    optimisticUpdate({
      run: ({ item }) => {
        item = {
          ...item,
          finished: !item.finished,
          finishedDate: new Date().toISOString()
        };
        return this.http
          .put(`/api/reading-list/${item.bookId}/finished`, item)
          .pipe(
            map(() => {
              const updatedItem = {
                id: item.bookId,
                changes: {
                  ...item
                }
              };
              return ReadingListActions.confirmAsFinishedReading({ item: updatedItem });
            })
          );
      },
      undoAction: ({ item }) => {
        const updatedItem = {
          id: item.bookId,
          changes: {
            ...item,
            finished: !item.finished
          }
        };
        return ReadingListActions.failedToUpdateAsFinishedReading({
          item: updatedItem
        });
      }
    })
  )
);

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
