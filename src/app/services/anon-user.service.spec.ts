import { TestBed, inject } from '@angular/core/testing';

import { AnonUserService } from './anon-user.service';

describe('AnonUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonUserService]
    });
  });

  it('should be created', inject([AnonUserService], (service: AnonUserService) => {
    expect(service).toBeTruthy();
  }));
});
