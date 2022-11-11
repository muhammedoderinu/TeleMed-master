import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorprofilepageComponent } from './doctorprofilepage.component';

describe('DoctorprofilepageComponent', () => {
  let component: DoctorprofilepageComponent;
  let fixture: ComponentFixture<DoctorprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorprofilepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
