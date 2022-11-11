import { User } from 'src/app/models/user.model';
import { LastMessage } from './last_message.model';
export interface Chat{
    id:string
    last_message: LastMessage
    users:User[]

    
}