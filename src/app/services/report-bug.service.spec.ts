import { TestBed, inject } from '@angular/core/testing';

import { ReportBugService } from './report-bug.service';

describe('ReportBugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportBugService]
    });
  });

  it('should be created', inject([ReportBugService], (service: ReportBugService) => {
    expect(service).toBeTruthy();
  }));
});
