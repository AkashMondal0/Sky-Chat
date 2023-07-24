import { create } from 'zustand'

interface CallbackRef {
    ref: string
    setRef: (value: string) => void
}

const callbackRef = create<CallbackRef>((set) => ({
    ref: "",
    setRef: (value: string) => set(() => ({ ref: value }))
}))


export default callbackRef