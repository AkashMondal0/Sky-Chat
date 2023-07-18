import { initialConversation } from '@/interfaces/Conversation'
import { friend, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface UseFriend {
    state: friend
    setUser: (friend: friend) => void
}

const useFriend = create<UseFriend>((set) => ({
    state: {
        friend: initialUser,
        lastMessage: '',
        lastMessageTime: "",
        conversation: initialConversation,
        conversationID: ''
    },
    setUser: (friend: friend) => set({ state: friend })
}))


export default useFriend