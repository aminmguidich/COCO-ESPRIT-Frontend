import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHouseComponent } from './list-house.component';

describe('ListHouseComponent', () => {
  let component: ListHouseComponent;
  let fixture: ComponentFixture<ListHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
