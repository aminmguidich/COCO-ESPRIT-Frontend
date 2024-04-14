import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnouncementComponent } from './list-announcement.component';

describe('ListAnnouncementComponent', () => {
  let component: ListAnnouncementComponent;
  let fixture: ComponentFixture<ListAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
