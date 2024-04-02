import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteailsAnnouncementComponent } from './deteails-announcement.component';

describe('DeteailsAnnouncementComponent', () => {
  let component: DeteailsAnnouncementComponent;
  let fixture: ComponentFixture<DeteailsAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeteailsAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeteailsAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
