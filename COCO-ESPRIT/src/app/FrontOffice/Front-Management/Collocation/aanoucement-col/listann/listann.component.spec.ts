import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListannComponent } from './listann.component';

describe('ListannComponent', () => {
  let component: ListannComponent;
  let fixture: ComponentFixture<ListannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListannComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
