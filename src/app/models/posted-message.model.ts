import { Chat } from "./chat.model"
import { Message } from "./message.model"

export interface PostedMessage{
    chat:Chat
    messages:Message[]

    
  }