import { TestBed } from '@angular/core/testing';

import { DoctordetailService } from './doctordetail.service';

describe('DoctordetailService', () => {
  let service: DoctordetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctordetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
