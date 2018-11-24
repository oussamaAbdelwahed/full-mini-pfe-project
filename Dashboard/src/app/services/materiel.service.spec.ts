import { TestBed } from '@angular/core/testing';

import { MaterielService } from './materiel.service';

describe('MaterielService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterielService = TestBed.get(MaterielService);
    expect(service).toBeTruthy();
  });
});
