import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientprofilepageComponent } from './patientprofilepage.component';

describe('PatientprofilepageComponent', () => {
  let component: PatientprofilepageComponent;
  let fixture: ComponentFixture<PatientprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientprofilepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
