import { Conversation, initialConversation } from "./Conversation"
export const initialUser: User = {
    id: "",
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    create: new Date(),
    updateAt: new Date(),
    Contacts: [],
    localDataFriends: [],
    FriendRequest: [],
    activeUser: false,
}
export const initialFriend: friend = {
    details: initialUser,
    lastMessage: '',
    lastMessageTime: new Date(),
    conversation: initialConversation,
    conversationID: ''
}

export interface User {
    id: string
    name: string
    email: string
    bio?: string
    emailVerified: boolean
    image: string
    create: any
    updateAt: any
    Contacts: Contacts[]
    FriendRequest: friendRequest[]
    localDataFriends: friend[]
    activeUser: boolean
    lastTimeOnline?: any
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

export interface friend {
    details: User
    lastMessage: string
    lastMessageTime: any
    conversation: Conversation
    conversationID: string
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