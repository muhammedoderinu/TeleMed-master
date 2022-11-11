import { PatientService } from 'src/app/services/patient.service';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

import { Client } from '../../models/client.model';
import { AddClient } from 'src/app/actions/client.action';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { AddChat } from './../../actions/chat.action';
import { ChatSelectors } from './../../selector/chat.selector';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {Observable} from 'rxjs';
import { DoctorList } from 'src/app/models/doctorlist.model';
import { Index } from 'src/app/models/index.model';
import { DoctorSelectors } from 'src/app/selector/doctor.selector';
import { IndexSelectors } from 'src/app/selector/index.selector';
import { Chat } from 'src/app/models/chat.model';
import {Location} from '@angular/common'
import axios from 'axios';
import { AddMessage } from 'src/app/actions/message.action';
import { Output, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
@Output() sendChat = new EventEmitter<Chat>();
@Output() sendPeer = new EventEmitter<string>();

 chats!:Chat[]
 currentChat!:string
 patient!:User

 http = axios.create({
  baseURL: 'http://localhost:8000',
  headers:{
    'Content-Type': 'application/json',
    'X-Requested-With':'XMLHttpRequest',
  },
  withCredentials:true
})


  username!:string
  content = ''
  

  constructor( private router:Router, private chatService:ChatService, private storage:LocalStorageService, private route:ActivatedRoute, private patientService: PatientService) {} 

 

  saveChat(chat:Chat) {
    this.storage.store('chat', chat);
    console.log('chatee', chat)
    this.router.navigate(['/chat'])
  }


  chooseChatPeer(chat:Chat){
    this.patientService.getPatientFromServer()
    .then((res) => {
      this.patient = res
      if(this.patient.id != chat.users[1].id){
        this.currentChat = chat.users[1].username
      }else{
        this.currentChat = chat.users[0].username
      }
      this.sendPeer.emit(this.currentChat)
    })
   
  }

  
   ngOnInit():void {
    this.chatService.getChat().then( (res) =>{
      this.chats = res
      
    })

    this.route.queryParams.subscribe(params => {
      this.username = params['username']
      console.log('cht', this.username)
      
    })

    this.patientService.getPatientFromServer()
    .then((res) => {
      this.patient = res
    })
   
  }

   loadChat(chat:Chat){
    this.sendChat.emit(chat)
    this.chooseChatPeer(chat)
  }

}
