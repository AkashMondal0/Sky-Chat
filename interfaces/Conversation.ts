import { MessageData } from "./Message"
import { User } from "./User"

type chatType = "PRIVATE" | "GROUP" | "CHANNEL" | "PERSONAL"
export interface Conversation {
    id: string
    createDate: Date | any
    updateDate: Date | any
    lastMessageDate: Date | any
    lastMessage: string
    type: chatType
    isGroup: Boolean | false
    groupName: string | null
    groupImage: string | null
    groupMembers: User[]
    personal: string[]
    MessageDataId: string // real time
    FriendData: User
}

export const initialConversation: Conversation = {
    id: "",
    createDate: undefined,
    updateDate: undefined,
    lastMessageDate: undefined,
    lastMessage: "",
    isGroup: false,
    groupName: "",
    type: "PERSONAL",
    groupImage: "",
    groupMembers: [],
    MessageDataId: "",
    personal: [],
    FriendData: {
        id: "",
        name: "",
        email: "",
        bio: "",
        emailVerified: false,
        image: "",
        updateDate: undefined,
        createDate: undefined,
        Conversations: [],
        FriendRequest: [],
        activeUser: false
    }
}

// export interface LastMe

// export interface Contact {
//     id: string
//     createDate: Date | any
//     updateDate: Date | any
//     lastMessageDate: Date | any
//     lastMessage: string
//     type: chatType
//     isGroup: Boolean | false
//     groupName: string | null
//     groupImage: string | null
//     groupMembers: User[]
//     Friends: User
// }