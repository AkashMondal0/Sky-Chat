import { Conversation } from "./Conversation"
import { User } from "./User"

export interface Message {
    id: string
    body: string
    image: string
    createdAt: Date
    seenIds: string[]
    seen: User[]
    conversationId: string
    conversation: Conversation
    senderId: string
    sender: User
} 