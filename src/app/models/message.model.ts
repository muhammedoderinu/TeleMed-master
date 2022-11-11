import { Chat } from './chat.model';
import { User } from "./user.model"

export interface Message {
    chat:Chat
    chat_id: string
    created_at: string
    edited_at:string
    content: string
    id: string
    user: {
        username: string;
        avatar_url:string
        id:string
    }
    media:string[]
    
}