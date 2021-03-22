import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    // Added asynn pipe to the template.
   }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const SNACK_BAR = this._snackBar.open("Book added to reading list", "Undo", {
      duration:2000,
      verticalPosition: 'top',
    });
    SNACK_BAR.onAction().subscribe((_) => this.store.dispatch(removeFromReadingList({item: { bookId: book.id, ...book }})));
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
}
