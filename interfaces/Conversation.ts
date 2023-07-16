import { Message } from "./Message"
import { User } from "./User"

export interface Conversation {
    id: string
    createdAt: Date | any
    updateAt: Date | any
    lastMessageAt: Date | any
    lastMessage: string
    groupName: string | null
    groupImage: string | null
    isGroup: Boolean
    messages: Message[]
    userIds: string[]
}
export interface ConversationRequest {
    groupImage: Conversation["groupImage"],
    groupName: Conversation["groupName"],
    isGroup: Conversation["isGroup"],
    lastMessage: Conversation["lastMessage"],
    authorId: User["id"],
    userId:string
}

export const initialConversation:Conversation = {
    id: "",
    createdAt: undefined,
    updateAt: undefined,
    lastMessageAt: undefined,
    lastMessage: "",
    groupName: null,
    groupImage: null,
    isGroup: false,
    messages: [],
    userIds: []
}