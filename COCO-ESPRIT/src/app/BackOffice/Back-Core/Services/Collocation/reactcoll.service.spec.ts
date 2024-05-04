import { TestBed } from '@angular/core/testing';

import { ReactcollService } from './reactcoll.service';

describe('ReactcollService', () => {
  let service: ReactcollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactcollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
