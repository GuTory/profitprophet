import { TestBed } from '@angular/core/testing';

import { StockMetaService } from './stock-meta.service';

describe('StockMetaService', () => {
  let service: StockMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
