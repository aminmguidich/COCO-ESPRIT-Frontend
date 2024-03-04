import { TestBed } from '@angular/core/testing';

import { RatingCarpoolingService } from './rating-carpooling.service';

describe('RatingCarpoolingService', () => {
  let service: RatingCarpoolingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingCarpoolingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
