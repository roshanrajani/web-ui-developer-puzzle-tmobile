import { waitForAsync, TestBed } from '@angular/core/testing';
import { BooksDataAccessModule } from './books-data-access.module';

describe('ShopDataAccessModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BooksDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BooksDataAccessModule).toBeDefined();
  });
});
