import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRequirementComponent } from './table-requirement.component';

describe('TableRequirementComponent', () => {
  let component: TableRequirementComponent;
  let fixture: ComponentFixture<TableRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
