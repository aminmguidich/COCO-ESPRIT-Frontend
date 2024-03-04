import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReactComponent } from './list-react.component';

describe('ListReactComponent', () => {
  let component: ListReactComponent;
  let fixture: ComponentFixture<ListReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
