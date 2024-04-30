import { TestBed } from '@angular/core/testing';

import { RequirementanncolService } from './requirementanncol.service';

describe('RequirementanncolService', () => {
  let service: RequirementanncolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementanncolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
