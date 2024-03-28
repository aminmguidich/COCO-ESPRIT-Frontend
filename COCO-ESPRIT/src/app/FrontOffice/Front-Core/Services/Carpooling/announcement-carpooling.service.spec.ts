import { TestBed } from '@angular/core/testing';

import { AnnouncementCarpoolingService } from './announcement-carpooling.service';

describe('AnnouncementCarpoolingService', () => {
  let service: AnnouncementCarpoolingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementCarpoolingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
