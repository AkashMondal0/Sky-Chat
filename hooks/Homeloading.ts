import { create } from 'zustand'

interface HomeLoadingState {
    loading: boolean
    startLoading: () => void
    stopLoading: () => void
}

const useHomeLoading = create<HomeLoadingState>((set) => ({
    loading: false,
    startLoading: () => set({ loading:true }),
    stopLoading: () => set({ loading:false }),
}))


export default useHomeLoading