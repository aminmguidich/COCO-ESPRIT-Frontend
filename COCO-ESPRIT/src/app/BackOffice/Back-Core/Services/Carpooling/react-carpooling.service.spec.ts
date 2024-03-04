import { TestBed } from '@angular/core/testing';

import { ReactCarpoolingService } from './react-carpooling.service';

describe('ReactCarpoolingService', () => {
  let service: ReactCarpoolingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactCarpoolingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
