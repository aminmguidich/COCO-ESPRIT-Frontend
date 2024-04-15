import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReactComponent } from './edit-react.component';

describe('EditReactComponent', () => {
  let component: EditReactComponent;
  let fixture: ComponentFixture<EditReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
