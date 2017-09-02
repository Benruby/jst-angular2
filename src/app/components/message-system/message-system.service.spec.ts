import { TestBed, inject } from '@angular/core/testing';

import { MessageSystemService } from './message-system.service';

describe('MessageSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageSystemService]
    });
  });

  it('should be created', inject([MessageSystemService], (service: MessageSystemService) => {
    expect(service).toBeTruthy();
  }));
});
