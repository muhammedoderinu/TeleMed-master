import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMenuPagesComponent } from './video-menu-pages.component';

describe('VideoMenuPagesComponent', () => {
  let component: VideoMenuPagesComponent;
  let fixture: ComponentFixture<VideoMenuPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoMenuPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoMenuPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
