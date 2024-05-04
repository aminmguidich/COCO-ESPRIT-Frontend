import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddanoucecolComponent } from './addanoucecol.component';

describe('AddanoucecolComponent', () => {
  let component: AddanoucecolComponent;
  let fixture: ComponentFixture<AddanoucecolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddanoucecolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddanoucecolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
