import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostFComponent } from './add-post-f.component';

describe('AddPostFComponent', () => {
  let component: AddPostFComponent;
  let fixture: ComponentFixture<AddPostFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
