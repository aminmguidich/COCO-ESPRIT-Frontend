import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHouseComponent } from './update-house.component';

describe('UpdateHouseComponent', () => {
  let component: UpdateHouseComponent;
  let fixture: ComponentFixture<UpdateHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
