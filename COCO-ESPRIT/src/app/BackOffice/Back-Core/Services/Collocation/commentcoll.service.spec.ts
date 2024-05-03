import { TestBed } from '@angular/core/testing';

import { CommentcollService } from './commentcoll.service';

describe('CommentcollService', () => {
  let service: CommentcollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentcollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
