/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActiveProjectService } from './active-project.service';

describe('Service: ActiveProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveProjectService]
    });
  });

  it('should ...', inject([ActiveProjectService], (service: ActiveProjectService) => {
    expect(service).toBeTruthy();
  }));
});
