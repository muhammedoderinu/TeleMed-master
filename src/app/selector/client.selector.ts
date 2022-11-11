import { Client } from '../models/client.model';
import { ChatStateModel } from './../state/chat.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';
import { ChatState } from '../state/chat.state';
import { Chat } from '../models/chat.model';
import { ClientState, ClientStateModel } from '../state/client.state';


@Injectable()
export class ClientSelectors{
@Selector([ClientState])
   static clientInfo(state:ClientStateModel): Client[] {
   
    console.log(state.clients)
       return state.clients
       

   }

}