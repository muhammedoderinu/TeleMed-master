import { Injectable } from '@angular/core'
import {State, Action, StateContext} from '@ngxs/store'
import { Chat } from '../models/chat.model';
import { AddChat } from '../actions/chat.action'

export class ChatStateModel{
    chats!: Chat[]
}

@State<ChatStateModel>({
    name: 'chats',
    defaults: {
        chats: []
    }
})

@Injectable()
export class ChatState{

    @Action(AddChat)
    add(ctx: StateContext<ChatStateModel>, action:AddChat){
        const{name} = action
        if(!name){
            return
        }
      
         const state = ctx.getState();

         const chat: Chat = {
            id: name.id,
            last_message:name.last_message,
            users:name.users

          
         }
         

        ctx.setState({
            ...state,
            chats: [chat],

           });
    
           console.log(ctx.getState());


    }
}
