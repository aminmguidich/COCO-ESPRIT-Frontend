import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PircingFrontComponent } from './pircing-front.component';

describe('PircingFrontComponent', () => {
  let component: PircingFrontComponent;
  let fixture: ComponentFixture<PircingFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PircingFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PircingFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
