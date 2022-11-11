import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamingPageComponent } from './video-streaming-page.component';

describe('VideoStreamingPageComponent', () => {
  let component: VideoStreamingPageComponent;
  let fixture: ComponentFixture<VideoStreamingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoStreamingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoStreamingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
