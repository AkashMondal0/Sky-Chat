import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { User, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface ConversationState {
    conversations: Conversation[]
    currentConversation: Conversation
    friend: User
    isInbox: boolean
    ref: string
    currentConversationId: string
    setCurrentConversation: (conversation: Conversation) => void
    setConversations: (conversation: Conversation) => void
    setFriendConversation: (friend: User, conversationId: string) => void
    exitCurrentConversation: () => void
    setRef: (ref: string) => void
}

const useConversation = create<ConversationState>((set) => ({
    conversations: [],
    ref: "ref",
    isInbox: false,
    currentConversation: initialConversation,
    friend: initialUser,
    currentConversationId: '',

    setCurrentConversation: (conversation: Conversation) => set((state) => ({
        currentConversation: conversation,
        isInbox: true
    })),

    setFriendConversation: (friend: User, conversationId: string) => set((state) => ({
        currentConversationId: conversationId,
        friend: friend,
    })),

    setConversations: (conversation: Conversation) => set((state) => ({
        conversations: [...state.conversations, conversation]
    })),

    exitCurrentConversation: () => set((state) => ({
        currentConversation: initialConversation,
        isInbox: false,
        currentConversationId: '',
    })),
    setRef: (Ref: string) => set({ ref: Ref })
}))


export default useConversation