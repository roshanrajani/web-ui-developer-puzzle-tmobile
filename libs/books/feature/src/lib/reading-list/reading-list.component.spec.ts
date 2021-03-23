import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Store } from '@ngrx/store';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let spyDispatch: jest.SpyInstance;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    spyDispatch = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeFromReadingList action ', () => {
    const item = createReadingListItem('new');
    component.removeFromReadingList(item);
    expect(spyDispatch).toHaveBeenCalled;
  });
});
