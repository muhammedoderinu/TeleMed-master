import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientfeedComponent } from './patientfeed.component';

describe('PatientfeedComponent', () => {
  let component: PatientfeedComponent;
  let fixture: ComponentFixture<PatientfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientfeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
