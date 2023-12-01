import { TestBed } from '@angular/core/testing';

import { BytesService } from './bytes.service';

describe('BytesService', () => {
  let service: BytesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BytesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
