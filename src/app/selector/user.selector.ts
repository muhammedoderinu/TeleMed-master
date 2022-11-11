import { UserStateModel } from './../state/user.state';
import { Injectable } from '@angular/core'
import {Selector} from '@ngxs/store';
import { UserState } from '../state/user.state';
import { User } from '../models/user.model';


@Injectable()
export class UserSelectors{
@Selector([UserState])
   static userInfo(state:UserStateModel): User[] {
    console.log(state.users)
       return state.users
       

   }

}