import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { MessageData } from '@/interfaces/Message'
import { User, initialUser } from '@/interfaces/User'
import { create } from 'zustand'

interface ConversationState {
    conversationData: Conversation
    Friend: User
    FriendList: User[]
    setConversationData: (conversationData: Conversation) => void
    setFriend: (friend: User) => void
    setFriendList: (friend: User) => void
    reset: () => void
}

const useConversation = create<ConversationState>((set) => ({
    conversationData: initialConversation,
    Friend: initialUser,
    FriendList: [],
    setFriend: (friend: User) => set(() => ({ Friend: friend })),
    setConversationData: (conversationData: Conversation) => set(() => ({ conversationData: conversationData })),
    reset: () => set(() => ({ conversationData: initialConversation, Friend: initialUser })),

    setFriendList: (friend: User) => set((state) => {
        if (state.FriendList.find((item) => item.id === friend.id)) {
            return state
        }
        return { FriendList: [...state.FriendList, friend] }
    })
}))


export default useConversation