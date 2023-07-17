
export interface reply {
    message: string | null
    img: string | null
    video: string | null
    messageId: string | null
    authorId: string
}

export interface img {
    src: string[]
    caption: string
}

export interface Message {
    id: string
    message: string | ""
    img: img | [] | false |any
    reply: reply | false
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
    reply: false,
    seenIds: [],
    createdAt: undefined,
    updateAt: undefined,
    conversationId: "",
    messageUserId: ""
}