import { TestBed } from '@angular/core/testing';

import { PolygonRestService } from './polygon-rest.service';

describe('PolygonRestService', () => {
  let service: PolygonRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
