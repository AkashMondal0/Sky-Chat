import { Conversation, initialConversation } from "./Conversation"
export const initialUser: User = {
    id: "",
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    create: new Date(),
    update: new Date(),
    Conversations: [],
    FriendRequest: [],
    activeUser: false,
}

export interface User {
    id: string
    name: string
    email: string
    bio?: string
    emailVerified: boolean
    image: string
    create: any
    update: any
    Conversations: Conversation[]
    FriendRequest: friendRequest[]
    activeUser: boolean
    lastTimeOnline?: any
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

export interface UserState {
    state: User
    setUser: (User: User) => void
}

export interface friendRequest {
    receiver: User
    sender: User
    id: string
    createDate?: any
    status: boolean
    keyValue: idValue
}

type idValue = "SENDER" | "RECEIVER"