import{ User} from '../models/user.model'

export class AddUser {
   static readonly type = '[USER] Add'

   constructor(public name: User){
      

   }
}


export class RemoveUser {
    static readonly type = '[USER] Remove'
 
    constructor(public payload: string){
     
    }
 }