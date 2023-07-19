import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { create } from 'zustand'

interface ConversationState {
    state: Conversation
    setConversation: (conversation: Conversation) => void
}

const useConversation = create<ConversationState>((set) => ({
    state: initialConversation,
    setConversation: (conversation: Conversation) => set({ state: conversation })
}))


export default useConversation