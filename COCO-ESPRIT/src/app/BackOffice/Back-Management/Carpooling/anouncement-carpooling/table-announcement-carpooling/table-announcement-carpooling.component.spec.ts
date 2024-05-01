import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnnouncementCarpoolingComponent } from './table-announcement-carpooling.component';

describe('TableAnnouncementCarpoolingComponent', () => {
  let component: TableAnnouncementCarpoolingComponent;
  let fixture: ComponentFixture<TableAnnouncementCarpoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAnnouncementCarpoolingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAnnouncementCarpoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
