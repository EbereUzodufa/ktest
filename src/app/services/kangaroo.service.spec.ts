import { TestBed } from '@angular/core/testing';

import { KangarooService } from './kangaroo.service';

describe('KangarooService', () => {
  let service: KangarooService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KangarooService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
