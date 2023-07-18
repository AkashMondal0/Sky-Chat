import { Conversation } from '@/interfaces/Conversation'
import { Action, User, friend } from '@/interfaces/User'
import { GetConversationData } from '@/services/firebase/Conversation'
import { GetUserData, UpdateUserStatus } from '@/services/firebase/UserDoc'

export const initialUser: User = {
    id: '',
    name: '',
    email: '',
    emailVerified: false,
    image: '',
    createdAt: undefined,
    updateAt: undefined,
    Contacts: [],
    localDataFriends: []
}

export const UserReducer = (state: User, action: Action) => {
    
    switch (action.type) {
        case 'SET_USER':
          return state = action.payload
        case 'REMOVE_USER':
            return initialUser
        case 'SET_CONVERSATION':
            return {
                ...state,
                conversation: action.payload
            }
        case 'SET_MESSAGE':
            
            return state
        default:
            return state
    }
}