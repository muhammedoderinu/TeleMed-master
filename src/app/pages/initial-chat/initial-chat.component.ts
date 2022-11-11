//import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LocalStorageService } from 'ngx-webstorage';
import { Chat } from 'src/app/models/chat.model';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';
import { MessageServiceService } from 'src/app/services/message-service.service';

@Component({
  selector: 'app-initial-chat',
  templateUrl: './initial-chat.component.html',
  styleUrls: ['./initial-chat.component.css']
})
export class InitialChatComponent implements OnInit {
  id = ''
  chat!:Chat
  message!:Message[]

 
 
 

  constructor( private store: Store, private messageService:MessageServiceService, private storage:LocalStorageService) { }
 
  
  getChat(event:any) {
    const chat = event
    this.messageService.showMessage(chat.id).then((res) =>
    this.message = res)
    console.log('chatpage',this.chat)
  }


 ngOnInit(): void {
    
  }

}
