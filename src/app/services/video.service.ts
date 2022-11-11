import { ElementRef, Injectable, ViewChild, Renderer2 } from '@angular/core';
import axios from 'axios';
import { type } from 'jquery';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { User } from '../models/user.model';

const mediaConstraints ={
  audio:true,
  video:true,
 
};


@Injectable({
  providedIn: 'root'
})


export class VideoService {

  window!:Window
  localStream!:MediaStream
  remoteStream!:MediaStream
  peerConnection!: RTCPeerConnection;
  videoTrack: MediaStreamTrack | undefined;

  
  Pusher = Pusher
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })

  servers = {
    iceServers:[
      {
        urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
    ]
  }
 

  constructor() {
  }




  public subscribeToChannel(remoteVideo:ElementRef, localVideo:ElementRef, renderer:Renderer2){

    //const chat = this.storage.retrieve('chat')
    //console.log(chat.id)
    
    const echo = new Echo({
      broadcaster: 'pusher',
      key:'dee8cd908a31b2d5523d',
      cluster:'eu',
      wsPort: 6001,
      forceTLS: true,
      authorizer: (channel:any, options:any) => {
          return {
              authorize: (socketId:any, callback:any) => {
                  this.http.post('/api/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: channel.name
                  })
                  .then(response => {
                      callback(null, response.data);
                  })
                  .catch(error => {
                      callback(error);
                  });
              }
          };
      },
  })

  echo.join(`video.${'1234'}`)
    .here((users:User) => {
      this.createOffer(remoteVideo, localVideo, renderer)
        
    })
    .joining((user:User) => {
      this.handleUserJoined(remoteVideo, localVideo, renderer)
    })
    .leaving((user:User) => {
      this.handleUserLeft(remoteVideo, localVideo, renderer)
    })
    .error((error:any) => {
        console.error(error);
    })
    .listen('VideoSignallingCreated', (e:any) => {
       const message = JSON.parse(e.message)
       if(message.type === 'offer'){
        this.createAnswer(remoteVideo, localVideo, message.offer, renderer )
       }
       if(message.type == 'answer'){
        this.addAnswer(message.answer)
       }
       if(message.type == 'candidate'){
        if(this.peerConnection){
          this.peerConnection.addIceCandidate(message.candidate)
        }
       } 
    }) 

  }

  public handleUserLeft(remoteVideo: ElementRef, localVideo:ElementRef, renderer:Renderer2){
    renderer.setStyle(remoteVideo.nativeElement, 'display', 'none')
    renderer.removeClass(localVideo.nativeElement, 'smallFrame')
  }
  public handleUserJoined(remoteVideo: ElementRef, localVideo:ElementRef, renderer:Renderer2){
    renderer.setStyle(remoteVideo.nativeElement, 'display', 'block')
    renderer.addClass(localVideo.nativeElement, 'smallFrame')
  }

  public async createPeerConnection(remoteVideo: ElementRef, localVideo:ElementRef, renderer:Renderer2){
    renderer.setStyle(remoteVideo.nativeElement, 'display', 'block')
   
    this.peerConnection = new RTCPeerConnection(this.servers)
     this.remoteStream = new MediaStream()
     try{
       remoteVideo.nativeElement.srcObject = this.remoteStream
    
     }catch{
      console.log('error')

     }
    

    if(!this.localStream){
      try{
        this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        localVideo.nativeElement.srcObject = this.localStream;
      }catch{
      }

    } 
    this.localStream.getTracks().forEach((track)  =>{
      this.peerConnection.addTrack(track, this.localStream)
    })

    this.peerConnection.ontrack = (event) =>{
      event.streams[0].getTracks().forEach((track) =>{
        this.remoteStream.addTrack(track)
      })
    }

    this.peerConnection.onicecandidate = async (event) =>{
      if(event.candidate){
        const candidate = JSON.stringify(event.candidate)
        this.sendMessageToPeer(candidate)
        console.log('New ICE candidate:',JSON.stringify({'type':'candidate', 'candidate':event.candidate}))
      }
    }


  }


  public async initialize(remoteVideo:ElementRef, localVideo: ElementRef){
  
    try{
      this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      localVideo.nativeElement.srcObject = this.localStream;
   
    }catch{
    }
    //this.createOffer(remoteVideo)
  
  }

  public async createOffer(remoteVideo:ElementRef, localVideo:ElementRef, renderer:Renderer2){
    await this.createPeerConnection(remoteVideo, localVideo, renderer)

    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)

    this.sendMessageToPeer(JSON.stringify({'type':'offer', 'offer':offer}))
  
    console.log('offer :', offer)

    

  }

  public async createAnswer(remoteVideo:ElementRef, localVideo:ElementRef, offer:RTCSessionDescriptionInit, renderer:Renderer2){
    await this.createPeerConnection(remoteVideo, localVideo, renderer)
    await this.peerConnection.setRemoteDescription(offer)
    const answer = await this.peerConnection.createAnswer()
    await this.peerConnection.setLocalDescription(answer)
    this.sendMessageToPeer( JSON.stringify({'type':'answer', 'answer':answer}))

  }

  public addAnswer(answer:any){
    if(!this.peerConnection.currentRemoteDescription){
      this.peerConnection.setRemoteDescription(answer)
    }
  }

  public async sendMessageToPeer( message:string ){
      await this. http.post('api/video-service',{
     'message': message
    }).then((response) =>{

    }).catch((error) =>{

    })

  }

  public async leaveChannel(){}

  public async toggleCamera(cameraBtn:ElementRef, renderer:Renderer2){
    const videoTrack = this.localStream.getTracks().find(track => track.kind === 'video')
    if(videoTrack?.enabled){
      videoTrack.enabled = false
      renderer.setStyle(cameraBtn.nativeElement, 'background-color', 'rgb(255, 80, 80)')
    }else if(videoTrack?.enabled == false){
        videoTrack.enabled = true
        renderer.setStyle(cameraBtn.nativeElement, 'background-color', 'rgb(179, 102, 249, .9)')
      }
  }

  public async toggleMic(micBtn:ElementRef, renderer:Renderer2){
    const audioTrack = this.localStream.getTracks().find(track => track.kind === 'audio')
    if(audioTrack?.enabled){
      audioTrack.enabled = false
      renderer.setStyle(micBtn.nativeElement, 'background-color', 'rgb(255, 80, 80)')
    }else if(audioTrack?.enabled == false){
        audioTrack.enabled = true
        renderer.setStyle(micBtn.nativeElement, 'background-color', 'rgb(179, 102, 249, .9)')
      }
  }

  public closeWindow(){}
  



}
