import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamingComponentComponent } from './video-streaming-component.component';

describe('VideoStreamingComponentComponent', () => {
  let component: VideoStreamingComponentComponent;
  let fixture: ComponentFixture<VideoStreamingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoStreamingComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoStreamingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
