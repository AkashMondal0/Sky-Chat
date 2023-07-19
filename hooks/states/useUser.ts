import { User, UserState, initialUser } from '@/interfaces/User'
import { create } from 'zustand'



const useUser = create<UserState>((set) => ({
    state: initialUser,
    setUser: (User: User) => set({ state: User })
}))


export default useUser