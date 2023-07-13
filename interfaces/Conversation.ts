import { Message } from "./Message"
import { User } from "./User"

export interface Conversation {
    id: string
    createdAt: Date
    updateAt: Date
    lastMessageAt: Date
    name: string
    isGroup: Boolean
    messagesIds: string[]
    messages: Message[]
    userId: string[]
    user: User[]
}