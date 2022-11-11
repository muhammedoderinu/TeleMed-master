import { MessageServiceService } from './../../services/message-service.service';
import { Client } from 'src/app/models/client.model';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {Location} from '@angular/common'
import { AddClient } from 'src/app/actions/client.action';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.model';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-chattingpage',
  templateUrl: './chattingpage.component.html',
  styleUrls: ['./chattingpage.component.css']
})
export class ChattingpageComponent implements OnInit {

  id = ''
  message!:Message[]
  chatPeer!:string
 
 
 

  constructor(private location: Location, private store: Store, private  messageService:MessageServiceService, private storage:LocalStorageService) { }
 
  
  getChat(event:any) {
    const chat = event
    this.messageService.showMessage(chat.id).then((res) =>
    this.message = res)
    console.log('chatpage',chat)
  }

  getPeer(event:any){
    this.chatPeer = event
  }

  ngOnInit():void {}

}
