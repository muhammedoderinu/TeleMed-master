import { ActivatedRoute } from '@angular/router';
import { MessageServiceService } from './../../services/message-service.service';
import { PostedMessage } from './../../models/posted-message.model'
import { AddMessage } from './../../actions/message.action';
import { Message } from '../../models/message.model';
import { Client } from '../../models/client.model';
import { Messages } from './../../models/messages.model';
import { Doctor } from './../../models/doctor.model';
import { User } from './../../models/user.model';
import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import axios from 'axios';
import { Chat } from 'src/app/models/chat.model';
import { ChatSelectors } from 'src/app/selector/chat.selector';
import { DoctorSelectors } from 'src/app/selector/doctor.selector';
import {Location} from '@angular/common'
import {Observable} from 'rxjs'
import { AddChat } from 'src/app/actions/chat.action';
import { MessageSelectors } from 'src/app/selector/message.selector';
import { AddClient } from 'src/app/actions/client.action';
import { ClientSelectors } from 'src/app/selector/client.selector';
import { ChatService } from 'src/app/services/chat.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'ngx-auth';
import Echo from 'laravel-echo';
 

 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 

  @Output() sendChat = new EventEmitter<any>()
  @Input() 
  messages!: Message[]
  @Input()username!:string
  chatId!:string
  chatPeerId!:string




  postedMessage!:PostedMessage
   
  content = ''

 
  getValue(event: Event): any {
    return (event.target as HTMLInputElement).value;
  }


  constructor(private location:Location, private route:ActivatedRoute, private  chatService: ChatService,
    private messageService:MessageServiceService, private storage:LocalStorageService ) {

  }

  ngOnInit():void{
   
    this.route.queryParams.subscribe(params => {
      this.chatPeerId = params['peerId'];
      this.username = params['username']
      this.chatId = params['chatId']
      if(this.chatId){
        this.messageService.showMessage(this.chatId)
        .then((res) =>{
          this.messages = res
          this.subscribeTochannel(this.messages[0].chat.id)
          console.log('d-message', this.messages)
        })
      }

      if(this.chatPeerId){
        this.messageService.showClientChat(this.chatPeerId).then((res) =>{
          this.messages = res
          console.log(this.messages[0].chat_id)
          this.subscribeTochannel(this.messages[0].chat_id)
          console.log('c-message', this.messages)
        })

      }
    })
  }

  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })


  subscribeTochannel(chatId:string){
    
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
    console.log('ope', chatId)

    echo.join(`chat.${chatId}`)
      .here((users:User) => {
        console.log('UserJoined')
          
      })
      .joining((user:User) => {
          console.log(user.username);
      })
      .leaving((user:User) => {
          console.log(user.username);
      })
      .error((error:any) => {
          console.error(error);
      })
      .listen('ChatMessageCreated', (e:any) => {
        this.messages.push(e.message)
        console.log('i am recieved', this.messages);
    })
    .listenForWhisper('typing', (e:any) => {
      console.log(e.name);
    }); 
  }



  async postMessageScheduler(client_id:string, content:string){
    await this.messageService.postMessage(client_id, content)
  }






  

 
}
