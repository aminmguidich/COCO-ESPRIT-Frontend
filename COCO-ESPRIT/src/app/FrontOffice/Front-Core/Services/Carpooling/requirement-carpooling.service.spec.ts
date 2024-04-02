import { TestBed } from '@angular/core/testing';

import { RequirementCarpoolingService } from './requirement-carpooling.service';

describe('RequirementCarpoolingService', () => {
  let service: RequirementCarpoolingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementCarpoolingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
