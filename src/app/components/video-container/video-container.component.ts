// import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// // import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-sdk';
// // import { AngularAgoraRtcModule } from 'angular-agora-rtc';


// const mediaConstraints ={
//   audio:true,
//   video:true
// };

// @Component({
//   selector: 'app-video-container',
//   templateUrl: './video-container.component.html',
//   styleUrls: ['./video-container.component.css']
// })
// export class VideoContainerComponent implements AfterViewInit {
//  APP_ID = "66e23488f7bf47d2afb2c183238d39be"
//  token:string = ''
//  private localStream!: MediaStream;
//  private remoteStream!: MediaStream;
//  private peerConnection!: RTCPeerConnection;
//  private client!: RtmClient;
//  private channel!:RtmChannel
//  private uid:string = String(Math.floor(Math.random()*10000))

 
        


//   servers ={
//   iceServers:[
//      {
//       urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
//      }
//   ]
//  }
//  @ViewChild('user_1')
//   private localVideo!: ElementRef;

//   @ViewChild('user_2')
//   private remoteVideo!: ElementRef;

//   constructor() { 
//   }
//   ngAfterViewInit(): void {
//     this.requestMediaDevices();
//   }
 
   
  
//   ngOnInit(){
     
//   }

//   private async requestMediaDevices(): Promise <void>{
//     this.client = AgoraRTM.createInstance(this.APP_ID);
//     await this.client.login({ uid:this.uid});
//     this.channel = this.client.createChannel('main');
//     await this.channel.join()

//     this.channel.on('MemberJoined', this.handleUserJoined)

//     this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
//     this.localVideo.nativeElement.srcObject = this.localStream;
//     this.createOffer();
//   }

//   handleUserJoined = async (MemberId: any) =>{
//     console.log('A new user joined:', MemberId)
        
//   }


//   createOffer = async () => {
//     this.peerConnection = new RTCPeerConnection(this.servers);
//     this.remoteStream = new MediaStream()
//     this.remoteVideo.nativeElement.srcObject = this.remoteStream;


//     //add track to the remote strem
//     this.localStream.getTracks().forEach((track) => {
//       this.peerConnection.addTrack(track, this.localStream)
//     })


//     this.peerConnection.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) =>{
//         this.remoteStream.addTrack(track)
//       })
//     }


//     this.peerConnection.onicecandidate = async (event) => {
//       if(event.candidate){
//         console.log('New Ice candidate:', event.candidate)
//       }

//     }

//     //create offer;
//      let offer = await this.peerConnection.createOffer();
//      await this.peerConnection.setLocalDescription(offer);
//      console.log('Offer:', offer);
     
    

//   }





// }
