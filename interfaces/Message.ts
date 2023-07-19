
export interface reply {
    message: string
    img: [] | null
    video: string | null
    messageId: string | null
    authorId: string
}

export interface img {
    src: string[]
    caption: string
}

export const initialReply:reply = {
    message: "",
    img: null,
    video: null,
    messageId: null,
    authorId: "",
} 
export interface Message {
    id: string
    message: string | ""
    img: img | [] | false |any
    reply: reply
    seenIds: string[]
    createdAt: Date | any
    updateAt: Date | any
    conversationId: string
    messageUserId: string
}

export const initialMessage: Message = {
    id: "",
    message: "",
    img: [],
    reply: initialReply,
    seenIds: [],
    createdAt: undefined,
    updateAt: undefined,
    conversationId: "",
    messageUserId: ""
}

