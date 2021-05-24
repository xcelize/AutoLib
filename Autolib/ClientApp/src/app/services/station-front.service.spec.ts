import { TestBed } from '@angular/core/testing';

import { StationFrontService } from './station-front.service';

describe('StationFrontService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationFrontService = TestBed.get(StationFrontService);
    expect(service).toBeTruthy();
  });
});
