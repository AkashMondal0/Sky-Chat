import { initialConversation } from '@/interfaces/Conversation'
import { friend, initialFriend, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface UseFriend {
    state: friend
    setUser: (friend: friend) => void
}

const useFriend = create<UseFriend>((set) => ({
    state: initialFriend,
    setUser: (friend: friend) => set({ state: friend })
}))


export default useFriend