import { LocalStorageService } from 'ngx-webstorage';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AddChat } from 'src/app/actions/chat.action';
import { Chat } from 'src/app/models/chat.model';
import { AddClient } from 'src/app/actions/client.action';
import {Location} from '@angular/common'
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat-message-page',
  templateUrl: './chat-message-page.component.html',
  styleUrls: ['./chat-message-page.component.css']
})
export class ChatMessagePageComponent implements OnInit {

  
  messages!:Message[]

  constructor(private store: Store, private location: Location, private storage:LocalStorageService) { }

  getMessage(message:any) {
    this.messages = message
    console.log('chatpage',this.messages)
  }

  ngOnInit(): void {
    const chat = this.storage.retrieve('chat')
    console.log('jjj', chat)
    this.showMessage(chat.id)
    
  

  }

  addChat(chat: any){
    this.store.dispatch(new AddChat(chat))
    }
    addClient(id:string, username:string, avatar_url:string){
      this.store.dispatch(new AddClient({id, username, avatar_url}))
    }

  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })

  
  async showMessage(id:string){
    await this.http.get('api/chats-show/'+id+'/')
    .then((response) => {
      if(response.status === 200){
        this.messages = response.data.data
        console.log('messages:')
      }
    }).catch((error) => {

    })
  }

  async showChat(chat:Chat){
    await this.http.get('api/chats-show/'+chat.id+'/')
    .then((response) => {
      if(response.status === 200){
        this.messages = response.data.data
        console.log('messages:', this.messages)
        this.addChat(chat)
        this.addClient(chat.users[2].id, chat.users[2].username, chat.users[2].avatar_url )
        console.log('click:', chat)
        console.log('message:', this.messages)
       
      }
    }).catch((error) => {

    })
  }




}
