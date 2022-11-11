import { User } from 'src/app/models/user.model';
export interface LastMessage{
    chat_id:string
    content:string
    id:string
    user_id:string
    user:User
}