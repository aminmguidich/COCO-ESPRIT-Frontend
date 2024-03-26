import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReactFrontComponent } from './add-react-front.component';

describe('AddReactFrontComponent', () => {
  let component: AddReactFrontComponent;
  let fixture: ComponentFixture<AddReactFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReactFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReactFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
