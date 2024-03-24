import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommentfComponent } from './addcommentf.component';

describe('AddcommentfComponent', () => {
  let component: AddcommentfComponent;
  let fixture: ComponentFixture<AddcommentfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcommentfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcommentfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
