import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnoucementComponent } from './update-annoucement.component';

describe('UpdateAnnoucementComponent', () => {
  let component: UpdateAnnoucementComponent;
  let fixture: ComponentFixture<UpdateAnnoucementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnnoucementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
