import { Account } from "./Account"
import { Conversation } from "./Conversation"
import { Message } from "./Message"

export interface User {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string
    createdAt: Date | undefined
    updateAt: Date | undefined

    conversationsIds: string[]
    conversation: Conversation[]

    seenMessagesIds: string[]
    seenMessages: Message[]
    accounts: Account[]
    messages: Message[]
}


export interface UserCredential {
    name?: User["name"];
    email: User["email"];
    password: string;
}

export interface UserLogin {
    name: User["name"];
    email: User["email"];
    emailVerified: User["emailVerified"];
    image: User["image"];
    id: User["id"];
}

export interface Action {
    type: string;
    payload: any;
}

export interface UserContextIn {
    state: User;
    dispatch: React.Dispatch<Action>;
}

export const initialState: User = {
    id: '',
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    createdAt: undefined,
    updateAt: undefined,
    conversationsIds: [],
    conversation: [],
    seenMessagesIds: [],
    seenMessages: [],
    accounts: [],
    messages: []
}