import { User, UserLogin } from '@/interfaces/User';
import { create } from 'zustand';

interface UserStore {
    author: User | false;
    login: (user: UserLogin) => void;
    logout: () => void;
    update: (user: User) => void;
}

const useUserData = create<UserStore>((set) => ({
    author: {
        id: "",
        name: "",
        email: "",
        emailVerified: false,
        image: "",
        conversationsIds: [],
        conversation: [],
        seenMessagesIds: [],
        seenMessages: [],
        accounts: [],
        messages: [],
    },
    login: (user) => {
        set({});
    },
    logout: () => set({ author: false }),
    update: (user: User) => set({ author: user }),
}));

export { useUserData };