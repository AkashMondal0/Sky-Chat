import React from 'react'
import { Card, List, Typography } from '@/app/Material'
import UserCard from '../../Card/userCard'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'
import { UserContextIn, UserState } from '@/interfaces/User'

interface MyUserList {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
    UserState
}) => {
    const { name, localDataFriends, activeUser } = UserState.state

    return (
        <>
            <div className='h-[90px] sticky top-0 z-50 px-4 py-2 bg-white'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">{name}</Typography>
                    {activeUser && <div>Online</div>}
                    <LuEdit size={26} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                </div>
                <div className='flex justify-between pt-4'>
                    <Typography variant="h6">Message</Typography>
                    <p className='text-sm cursor-pointer' onClick={() => { onTabChange("requestUserList") }}>Requests</p>
                </div>
            </div>
            <List>
                {localDataFriends.map((item, index) => <UserCard key={index} localDataFriends={item} />)}
            </List>
        </>
    )
}

export default MyUserList
