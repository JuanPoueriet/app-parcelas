import { TestBed } from '@angular/core/testing';

import { PlotsServiceServiceService } from './plots-service-service.service';

describe('PlotsServiceServiceService', () => {
  let service: PlotsServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotsServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
