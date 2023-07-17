'use client';
import { UserContextIn } from "@/interfaces/User"
import { createContext } from "react"
import { initialUser } from "./UserReducer";

const UserContext = createContext<UserContextIn>({ state: initialUser, dispatch: () => { } })


export default UserContext 