import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagePageComponent } from './chat-message-page.component';

describe('ChatMessagePageComponent', () => {
  let component: ChatMessagePageComponent;
  let fixture: ComponentFixture<ChatMessagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessagePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
