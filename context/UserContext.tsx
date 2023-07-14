'use client';
import { UserContextIn, initialState } from "@/interfaces/User"
import { createContext } from "react"

const UserContext = createContext<UserContextIn>({ state: initialState, dispatch: () => { } })


export default UserContext 