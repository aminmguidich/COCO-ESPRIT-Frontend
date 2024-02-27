import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsFrontComponent } from './cars-front.component';

describe('CarsFrontComponent', () => {
  let component: CarsFrontComponent;
  let fixture: ComponentFixture<CarsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
