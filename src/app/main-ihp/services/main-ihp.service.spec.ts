import { TestBed } from '@angular/core/testing';

import { MainIhpService } from './main-ihp.service';

describe('MainIhpService', () => {
  let service: MainIhpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainIhpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
