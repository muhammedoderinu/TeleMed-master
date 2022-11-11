import { ChatStateModel } from './../state/chat.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';
import { ChatState } from '../state/chat.state';
import { Chat } from '../models/chat.model';


@Injectable()
export class ChatSelectors{
@Selector([ChatState])
   static chatInfo(state:ChatStateModel): Chat[] {
   
    console.log(state.chats)
       return state.chats
       

   }

}