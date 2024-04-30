import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponentComponent } from './pie-chart-component.component';

describe('PieChartComponentComponent', () => {
  let component: PieChartComponentComponent;
  let fixture: ComponentFixture<PieChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
