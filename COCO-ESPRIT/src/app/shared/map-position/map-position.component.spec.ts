import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPositionComponent } from './map-position.component';

describe('MapPositionComponent', () => {
  let component: MapPositionComponent;
  let fixture: ComponentFixture<MapPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
