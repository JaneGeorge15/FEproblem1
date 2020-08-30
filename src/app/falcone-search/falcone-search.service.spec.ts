/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FalconeSearchService } from './falcone-search.service';

describe('Service: FalconeSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FalconeSearchService]
    });
  });

  it('should ...', inject([FalconeSearchService], (service: FalconeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
