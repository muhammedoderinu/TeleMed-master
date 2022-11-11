import { VideoService } from './../../services/video.service';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video-streaming-component',
  templateUrl: './video-streaming-component.component.html',
  styleUrls: ['./video-streaming-component.component.css']
})
export class VideoStreamingComponentComponent implements OnInit, AfterViewInit {

  @ViewChild('user_1', {
    read: ElementRef
  })
  localVideo!: ElementRef;

  @ViewChild('user_2', {
    read: ElementRef
  })
  remoteVideo!: ElementRef;

  @ViewChild('camera_btn', {
    read: ElementRef
  })
  cameraBtn!: ElementRef;

  @ViewChild('mic_btn', {
    read: ElementRef
  })
  micBtn!: ElementRef;
 

  constructor(private videoService: VideoService, private renderer: Renderer2) { 
  }
  ngAfterViewInit(): void {
    this.videoService.initialize(this.remoteVideo, this.localVideo)
    this.videoService.subscribeToChannel(this.remoteVideo, this.localVideo, this.renderer)
  }

  ngOnInit(): void {
    
  }

  toggleCamera(){
    this.videoService.toggleCamera(this.cameraBtn, this.renderer)
  }

  toggleMic(){
    this.videoService.toggleMic(this.micBtn, this.renderer)
  }
  
  



}
