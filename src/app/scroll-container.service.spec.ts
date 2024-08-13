import { TestBed } from '@angular/core/testing';

import { ScrollContainerService } from './scroll-container.service';

describe('ScrollContainerService', () => {
  let service: ScrollContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
