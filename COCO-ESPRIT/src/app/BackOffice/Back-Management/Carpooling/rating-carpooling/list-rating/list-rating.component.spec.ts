import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRatingComponent } from './list-rating.component';

describe('ListRatingComponent', () => {
  let component: ListRatingComponent;
  let fixture: ComponentFixture<ListRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
