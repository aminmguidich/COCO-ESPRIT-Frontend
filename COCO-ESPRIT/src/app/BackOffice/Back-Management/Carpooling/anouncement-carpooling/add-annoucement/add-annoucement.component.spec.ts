import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnoucementComponent } from './add-annoucement.component';

describe('AddAnnoucementComponent', () => {
  let component: AddAnnoucementComponent;
  let fixture: ComponentFixture<AddAnnoucementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnoucementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
