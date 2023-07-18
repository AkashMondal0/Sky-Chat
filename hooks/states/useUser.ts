import { User, UserState } from '@/interfaces/User'
import { create } from 'zustand'



const useUser = create<UserState>((set) => ({
    state: {
        id: "",
        name: '',
        email: '',
        emailVerified: false,
        image: '',
        createdAt: undefined,
        updateAt: undefined,
        Contacts: [],
        localDataFriends: []
    },
    setUser: (User: User) => set({ state: User })
}))


export default useUser