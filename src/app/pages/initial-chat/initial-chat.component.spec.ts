import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialChatComponent } from './initial-chat.component';

describe('InitialChatComponent', () => {
  let component: InitialChatComponent;
  let fixture: ComponentFixture<InitialChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
