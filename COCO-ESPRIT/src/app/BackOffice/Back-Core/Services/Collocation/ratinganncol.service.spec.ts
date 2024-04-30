import { TestBed } from '@angular/core/testing';

import { RatinganncolService } from './ratinganncol.service';

describe('RatinganncolService', () => {
  let service: RatinganncolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatinganncolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
