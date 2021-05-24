import { TestBed } from '@angular/core/testing';

import { TypeVehiculeService } from './type-vehicule.service';

describe('TypeVehiculeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeVehiculeService = TestBed.get(TypeVehiculeService);
    expect(service).toBeTruthy();
  });
});
