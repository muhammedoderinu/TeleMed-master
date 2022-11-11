import { Injectable } from '@angular/core'
import {State, Action, StateContext} from '@ngxs/store'
import { Chat } from '../models/chat.model';
import { AddChat } from '../actions/chat.action'
import { Client } from '../models/client.model';
import { AddClient } from '../actions/client.action';

export class ClientStateModel{
    clients!: Client[]
}

@State<ClientStateModel>({
    name: 'clients',
    defaults: {
        clients: []
    }
})

@Injectable()
export class ClientState{

    @Action(AddClient)
    add(ctx: StateContext<ClientStateModel>, action:AddClient){
        const{name} = action
        if(!name){
            return
        }
      
         const state = ctx.getState();

         const client: Client = {
            id: name.id,
            username:name.username,
            avatar_url:name.avatar_url
           

          
         }
         

        ctx.setState({
            ...state,
            clients: [client],

           });
    
           console.log(ctx.getState());


    }
}
