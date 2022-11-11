
import { Chat } from 'src/app/models/chat.model';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable, Observer} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap, switchAll} from 'rxjs/operators';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import { Subject}  from 'rxjs';
import {map} from 'rxjs/operators';
import {Stomp} from '@stomp/stompjs'
import * as SockJs from "sockjs-client"
import * as SockJS from 'sockjs-client';
import { MessageSelectors } from '../selector/message.selector';
import { Select } from '@ngxs/store';
import { ClientSelectors } from '../selector/client.selector';
import { Client } from '../models/client.model';
import axios from 'axios';
import { Message } from '../models/message.model';
import { PostedMessage } from './../models/posted-message.model'
import Pusher from 'pusher-js';

const CHAT_URL = "ws://localhost:8080";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })
  messages!:Message[]
  chats!:Chat[]
  postedMessage!:PostedMessage
  @Output() sendChat = new EventEmitter<any>();

 
  async getChat(){
   const chats = await this.http.get('api/chats')
      .then( (response) => {
        if (response.status === 200) {
          console.log('getchat', response.data.chats)
          return response.data.chats;  
        }
      }).catch((error) => {
    });
    return chats
      
  }


//jj

  async laterPost(client_id:string, content:string){
    const chat_id =  this.messages[0].chat_id
    await this.http.post('api/chats-message/'+chat_id+'/',{
      'content' :   content,
      'users'    :  [client_id],
    }).then((response) =>{
      if(response.status===200){
        this.messages = response.data.data
        console.log('laterpost', this.messages)
      }
      return null
    })
  }

 
  async getMessages(){
    console.log('hopper')
    return this.messages
  }

 

}

  
   

