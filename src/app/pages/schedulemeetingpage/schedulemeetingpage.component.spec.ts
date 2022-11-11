import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemeetingpageComponent } from './schedulemeetingpage.component';

describe('SchedulemeetingpageComponent', () => {
  let component: SchedulemeetingpageComponent;
  let fixture: ComponentFixture<SchedulemeetingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulemeetingpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulemeetingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
