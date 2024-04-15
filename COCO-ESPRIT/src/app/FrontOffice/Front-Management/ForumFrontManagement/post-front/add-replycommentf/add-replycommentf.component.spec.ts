import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReplycommentfComponent } from './add-replycommentf.component';

describe('AddReplycommentfComponent', () => {
  let component: AddReplycommentfComponent;
  let fixture: ComponentFixture<AddReplycommentfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReplycommentfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReplycommentfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
