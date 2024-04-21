import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDragAndDropComponent } from './list-drag-and-drop.component';

describe('ListDragAndDropComponent', () => {
  let component: ListDragAndDropComponent;
  let fixture: ComponentFixture<ListDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDragAndDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
