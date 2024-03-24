import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcommentfComponent } from './listcommentf.component';

describe('ListcommentfComponent', () => {
  let component: ListcommentfComponent;
  let fixture: ComponentFixture<ListcommentfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcommentfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcommentfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
