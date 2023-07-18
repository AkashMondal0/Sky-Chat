import { Conversation } from '@/interfaces/Conversation'
import { create } from 'zustand'

interface ConversationState {
    state: Conversation
    setConversation: (conversation: Conversation) => void
}

const useConversation = create<ConversationState>((set) => ({
    state: {
        id: "",
        createdAt: new Date(),
        updateAt: new Date(),
        lastMessageAt: new Date(),
        lastMessage: "",
        groupName: "",
        groupImage: "",
        isGroup: false,
        messages: [],
        userIds: []
    },
    setConversation: (conversation: Conversation) => set({ state: conversation })
}))


export default useConversation