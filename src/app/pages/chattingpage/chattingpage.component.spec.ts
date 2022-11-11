import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattingpageComponent } from './chattingpage.component';

describe('ChattingpageComponent', () => {
  let component: ChattingpageComponent;
  let fixture: ComponentFixture<ChattingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChattingpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChattingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
