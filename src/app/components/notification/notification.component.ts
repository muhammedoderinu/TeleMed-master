import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userId!:string
  notifications!:any[]
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.subscribeTochannel()
    })
  }

  subscribeTochannel(){
   
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
  echo.private(this.userId)
    .listen('MeetingIdCreated', (e:any) => {
      this.notifications = e.message
      console.log('listeneing to notification', e);
  })

}

}
