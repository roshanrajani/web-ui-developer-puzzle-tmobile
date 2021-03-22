import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { distinctUntilChanged, debounceTime, pluck, takeUntil } from 'rxjs/Operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  public searchText : string;
  private destory: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(pluck('term'),debounceTime(500),distinctUntilChanged(),
    takeUntil(this.destory)).subscribe(val =>
    {
    this.searchText = val;
    this.searchBooks();
    this.cdr.detectChanges();
    })
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(){
    this.destory.next();
    this.destory.complete();
  }
}
