import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnoucementComponent } from './list-annoucement.component';

describe('ListAnnoucementComponent', () => {
  let component: ListAnnoucementComponent;
  let fixture: ComponentFixture<ListAnnoucementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnnoucementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
