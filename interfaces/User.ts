import { Account } from "./Account"
import { Conversation } from "./Conversation"
import { Message } from "./Message"

export interface User {
    id: string
    name: string
    email: string
    emailVerified: Date | undefined
    image: string
    hashedPassword: string
    createdAt: Date | undefined
    updateAt: Date | undefined

    conversationsIds: string[]
    conversation: Conversation[]

    seenMessagesIds: string[]
    seenMessages: Message[]
    accounts: Account[]
    messages: Message[]
}
