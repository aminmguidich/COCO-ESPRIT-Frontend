import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReactComponent } from './update-react.component';

describe('UpdateReactComponent', () => {
  let component: UpdateReactComponent;
  let fixture: ComponentFixture<UpdateReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
