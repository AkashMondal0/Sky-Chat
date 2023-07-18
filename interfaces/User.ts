import { Conversation, initialConversation } from "./Conversation"
export const initialUser: User = {
    id: '',
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    createdAt: undefined,
    updateAt: undefined,
    Contacts: [],
    localDataFriends: []
}
export interface User {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string
    createdAt: Date | undefined
    updateAt: Date | undefined
    Contacts: Contacts[]
    localDataFriends: friend[]
    activeUser?: boolean
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
    friend: User
    lastMessage: string
    lastMessageTime: any
    conversation: Conversation
    conversationID: string
}

export const initialFriend: friend = {
    friend: initialUser,
    lastMessage: "",
    lastMessageTime: undefined,
    conversation: initialConversation,
    conversationID: "",
}

export interface UserState {
    state: User
    setUser: (User: User) => void
}