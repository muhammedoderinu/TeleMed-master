
import { Messages } from './../models/messages.model';
import { Injectable } from '@angular/core'
import {State, Action, StateContext, Selector} from '@ngxs/store'
import { Message } from '../models/message.model';
import { AddChat } from '../actions/chat.action'
import { AddMessage } from '../actions/message.action';

export class MessageStateModel{
    messages!: Messages
}

@State<MessageStateModel>({
    name: 'messages',
    defaults: {
        messages: {'data':[]}
    }
})

@Injectable()
export class MessageState{

    @Action(AddMessage)
    add(ctx: StateContext<MessageStateModel>, action:AddMessage){
        const{name} = action
        if(!name){
            return
        }
      
         const state = ctx.getState();

         const message: Messages = {
             data:name.data

          
         }
         

        ctx.setState({
            ...state,
            messages: message,

           });
    
           console.log(ctx.getState());


    }
}
