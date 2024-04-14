import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequirementComponent } from './update-requirement.component';

describe('UpdateRequirementComponent', () => {
  let component: UpdateRequirementComponent;
  let fixture: ComponentFixture<UpdateRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
