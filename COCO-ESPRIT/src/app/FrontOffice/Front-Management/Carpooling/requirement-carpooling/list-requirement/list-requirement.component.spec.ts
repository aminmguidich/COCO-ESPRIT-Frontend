import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequirementComponent } from './list-requirement.component';

describe('ListRequirementComponent', () => {
  let component: ListRequirementComponent;
  let fixture: ComponentFixture<ListRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
