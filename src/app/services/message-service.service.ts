import { User } from 'src/app/models/user.model';
import { AuthService } from 'ngx-auth';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable, Injector} from '@angular/core';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {HttpXsrfTokenExtractor } from '@angular/common/http';
import { Message } from '../models/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageServiceService{
  Pusher = Pusher
  messages!: Message[]
  http = axios.create({
    baseURL: 'http://localhost:8000',
    headers:{
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
    withCredentials:true
  })

  constructor(private storage: LocalStorageService){
  
  }


 


  async postMessage(client_id:string, content:string){
    await this.http.post('api/chats',{
      'content' : content,
      'users'    :  [client_id],  
    }).then((response) =>{
      if(response.status===200){
      }
    }) 
  }

  async showMessage(chatId:string){
   const messages =  await this.http.get('api/chats-show/'+chatId+'/')
    .then((response) => {
      if(response.status === 200){
        return response.data.data
      }
    }).catch((error) => {

    })
    return messages
  }

  async showClientChat(id:string){
   const messages =  await this.http.get('api/chats-index/'+id+'/')
      .then( (response) => {
        if (response.status === 200) {
          console.log('getclientchat', response.data.data)
          return response.data.data;
         
        }
      }).catch((error) => {
    });
    return messages  
  }

  public listenToMessage(messages:Message[], message:Message){
    console.log('listenToMessage', message)
    messages.push(message)
  }
}
