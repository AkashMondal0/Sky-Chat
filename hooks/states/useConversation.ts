import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { MessageData } from '@/interfaces/Message'
import { User, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface ConversationState {
    conversationData: Conversation
    friend: User
    setConversationData: (conversationData: Conversation) => void
    setFriend: (friend: User) => void
    reset: () => void
}

const useConversation = create<ConversationState>((set) => ({
    conversationData: initialConversation,
    friend: initialUser,
    setFriend: (friend: User) => set(() => ({ friend: friend })),
    setConversationData: (conversationData: Conversation) => set(() => ({ conversationData: conversationData })),
    reset: () => set(() => ({ conversationData: initialConversation, Friend: initialUser })),
}))


export default useConversation