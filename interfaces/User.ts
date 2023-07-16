
import { Conversation } from "./Conversation"

export interface User {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string
    createdAt: Date | undefined
    updateAt: Date | undefined
    conversation: Conversation | null
    Contacts: Contacts[]
}


export const initialState: User = {
    id: '',
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    createdAt: undefined,
    updateAt: undefined,
    conversation: null,
    Contacts: []
}

export interface Contacts {
    friend: string
    conversation: string
    lastMessage?: string
    lastMessageTime?: any
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