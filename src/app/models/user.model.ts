import { Chat } from './chat.model';
export interface User{
    username: string;
    avatar_url:string
    id:string
    chats:Chat
   
}