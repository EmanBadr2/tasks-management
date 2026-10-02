/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpicsService } from './epics.service';

describe('Service: Epics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpicsService]
    });
  });

  it('should ...', inject([EpicsService], (service: EpicsService) => {
    expect(service).toBeTruthy();
  }));
});
