import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFComponent } from './post-f.component';

describe('PostFComponent', () => {
  let component: PostFComponent;
  let fixture: ComponentFixture<PostFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
