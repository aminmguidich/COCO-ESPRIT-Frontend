import { TestBed } from '@angular/core/testing';

import { AnnoucementCollocationService } from './annoucement-collocation.service';

describe('AnnoucementCollocationService', () => {
  let service: AnnoucementCollocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoucementCollocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
