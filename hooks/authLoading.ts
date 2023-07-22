import { create } from 'zustand'

interface LoadingState {
    state: boolean
    startLoading: () => void
    stopLoading: () => void
}

const useAuthLoading = create<LoadingState>((set) => ({
    state: false,
    startLoading: () => set({ state: true }),
    stopLoading: () => set({ state: false }),
}))


export default useAuthLoading