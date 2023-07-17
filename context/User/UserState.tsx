'use client';
import React, { useReducer } from 'react'
import UserContext from './UserContext';
import { UserReducer, initialUser } from './UserReducer';




const UserState = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(UserReducer, initialUser)


    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;