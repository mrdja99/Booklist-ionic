import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookInfoPage } from './book-info.page';

describe('BookInfoPage', () => {
  let component: BookInfoPage;
  let fixture: ComponentFixture<BookInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
