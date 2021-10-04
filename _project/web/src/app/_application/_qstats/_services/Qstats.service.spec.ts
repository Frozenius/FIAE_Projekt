/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QstatsService } from './Qstats.service';

describe('Service: Qstats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QstatsService]
    });
  });

  it('should ...', inject([QstatsService], (service: QstatsService) => {
    expect(service).toBeTruthy();
  }));
});
