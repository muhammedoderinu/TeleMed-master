import { Injectable } from '@angular/core'
import {State, Action, StateContext, Selector} from '@ngxs/store'
import { User } from '../models/user.model'
import {AddUser, RemoveUser} from './../actions/user.actions'

export class UserStateModel{
    users!: User[]
}

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

@Injectable()
export class UserState {
   
    @Action(AddUser)
    add(ctx: StateContext<UserStateModel>, action:AddUser){
        const{name} = action
        if(!name){
            return
        }
         const state = ctx.getState();

       const user:User = {
        username:name.username,
        avatar_url:name.avatar_url,
        id:name.id,
        chats:name.chats
       }

       ctx.setState({
        ...state,
        users: [user],
    
       })

       console.log(ctx.getState());
    }

    

    

    @Action(RemoveUser)
    remove({getState, patchState}: StateContext<UserStateModel>,{payload}: RemoveUser){
        
         patchState({
            users: getState().users.filter(a => a.username != payload)
         })
    }

}

