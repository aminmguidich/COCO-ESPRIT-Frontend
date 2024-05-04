import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHComponent } from './update-h.component';

describe('UpdateHComponent', () => {
  let component: UpdateHComponent;
  let fixture: ComponentFixture<UpdateHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
