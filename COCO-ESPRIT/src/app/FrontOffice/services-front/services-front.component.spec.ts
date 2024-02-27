import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesFrontComponent } from './services-front.component';

describe('ServicesFrontComponent', () => {
  let component: ServicesFrontComponent;
  let fixture: ComponentFixture<ServicesFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
