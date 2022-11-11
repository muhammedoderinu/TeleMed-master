import { Messages } from './../models/messages.model';
import { Message } from './../models/message.model'
import { MessageState, MessageStateModel } from './../state/message.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';



@Injectable()
export class MessageSelectors{
@Selector([MessageState])
   static messageInfo(state:MessageStateModel): Messages {
    console.log(state.messages)
       return state.messages
       
}
}