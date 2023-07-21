import React from 'react'
import { Card, List, Typography } from '@/app/Material'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'
import { UserState, initialUser } from '@/interfaces/User'
import useUser from '@/hooks/states/useUser'
import { useRouter } from 'next/navigation'
import { RemoveToken } from '@/functions/localData'
import routesName from '@/routes'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import FriendCard from '../../Card/FriendCard'

interface MyUserList {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
    UserState
}) => {
    const router = useRouter()
    const { name, localDataFriends, activeUser } = UserState.state
    const userState = useUser()

    const logout = () => {
        userState.setUser(initialUser)
        RemoveToken()
        UpdateUserStatus(userState.state.id, false)
        router.replace(routesName.auth)
    }

    return (
        <>
            <div className='h-[90px] sticky top-0 z-50 px-4 py-2 bg-white my-4'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">{name}</Typography>
                    {activeUser && <div className='cursor-pointer' onClick={logout}>Logout</div>}
                    <LuEdit size={26} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                </div>
                <div className='flex justify-between pt-4'>
                    <Typography variant="h6">Message</Typography>
                    <p className='text-sm cursor-pointer' onClick={() => { onTabChange("requestUserList") }}>Requests</p>
                    <p className='text-sm cursor-pointer' onClick={() => { onTabChange("notification") }}>Notification</p>
                </div>
            </div>
            <List>
                {localDataFriends.map((item, index) => {
                    return <FriendCard key={index} localDataFriends={item} />
                })}
            </List>
        </>
    )
}

export default MyUserList
