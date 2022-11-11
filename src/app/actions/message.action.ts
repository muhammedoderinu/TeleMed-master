import { Messages } from './../models/messages.model';
import { Message } from './../models/message.model';


export class AddMessage {
    static readonly type = '[MessageLIST] Add'
 
    constructor(public name: Messages){
        
 
    }
 }