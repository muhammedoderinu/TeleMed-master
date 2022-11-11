import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-video-menu',
  templateUrl: './video-menu.component.html',
  styleUrls: ['./video-menu.component.css']
})
export class VideoMenuComponent implements OnInit {
  selected: Date | null | undefined;
  today = new Date();
  peerId!:string
  meetingId!:any
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })



  constructor(private route:ActivatedRoute, private router:Router) {
  
   }

  //  @HostListener('window:beforeunload')
  // goToPage() {
  //   this.router.navigate(['/home']);
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.peerId = params['id'];
      this.initializeVideoChat()
    })
    
  }

  initializeVideoChat(){
    this.http.get('api/meeting')
    .then((response) => {
      if(response.status === 200){
        this.meetingId =  response.data
  
      }
    })
  }

  shareMeetingDetails(){
    this.http.post('api/create/'+this.peerId,{
      'meetingId': this.meetingId
    })
    .then((response) =>{
      if(response.status==200){

      }
    })
  }

  
}
