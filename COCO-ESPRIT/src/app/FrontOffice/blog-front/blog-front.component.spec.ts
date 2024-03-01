import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFrontComponent } from './blog-front.component';

describe('BlogFrontComponent', () => {
  let component: BlogFrontComponent;
  let fixture: ComponentFixture<BlogFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
