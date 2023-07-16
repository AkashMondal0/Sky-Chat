'use client';
import { Action, User, initialState } from '@/interfaces/User'
import React, { useReducer } from 'react'
import UserContext from './UserContext';


const reducer = (state: User, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return state = action.payload
        case 'REMOVE_USER':
            return initialState
        case 'SET_CONVERSATION':
            return {
                ...state,
                conversation: action.payload
            }
        default:
            return state
    }
}

const UserState = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;