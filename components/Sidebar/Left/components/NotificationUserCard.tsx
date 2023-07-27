/* eslint-disable @next/next/no-img-element */
import { ListItemPrefix, Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import { User, friendRequest, initialUser } from '@/interfaces/User'
import { GetUserData } from '@/services/firebase/UserDoc'
import React, { useCallback, useEffect, useState } from 'react'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import { BtnInstagram } from '@/components/Button/Button'
import { CreateConversation } from '@/services/firebase/Conversation'
import { truncate } from '@/functions/app'


interface UserCardProps {
    UserId: string
    FriendRequestData: friendRequest
}
const NotificationUserCard: React.FC<UserCardProps> = ({
    UserId,
    FriendRequestData
}) => {
    const currentUser = useUser()
    const [user, setUsers] = useState<User>(initialUser)
    const [loading, setLoading] = useState<boolean>(false)

    const [user, setUser] = useState<User>(initialUser)

    const get = async () => {
        const user = await GetUserData(UserId) as User
        setUser(user)
    }

    useEffect(() => {
        get()
    }, [])

    const acceptConversation = useCallback(async (friendId: string, FriendRequestId: string) => {
        console.log("callback")
        RemoveFriendRequest(FriendRequestId, currentUser.state.id, friendId)
        CreateConversation(
            currentUser.state, // currentUser id
            user // friend data
        )
    }, [currentUser.state, user])
    const handle = async (friendId: string) => {
        setLoading(true)
        await CreateConversation(
            currentUser.state, // currentUser id
            user // friend data
        )
        await RemoveFriendRequest(FriendRequestData.id, currentUser.state.id, friendId)
        setLoading(false)
    }


    return (
        <>
            <div onClick={() => { }}>
                <div className='cursor-pointer flex justify-between items-center py-3 px-2 rounded-xl hover:bg-gray-100'>
                    <div className='flex justify-between items-center'>
                        <ListItemPrefix>
                            <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                                alt="not found"
                                src={user.image || "/images/user.png"} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                {truncate(user.name) || "No Name"}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {truncate(user.email) || "No Email"}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex gap-1'>

                        <BtnInstagram
                            // disabled={loading}
                            danger
                            onClick={() => {
                                RemoveFriendRequest(FriendRequestData.id, currentUser.state.id, user.id)
                            }}
                            label={"Cancel"} />
                        <BtnInstagram
                            // disabled={loading}
                            onClick={() => { acceptConversation(user.id, item.id) }}
                            disabled={loading}
                            onClick={() => { handle(user.id) }}
                            label={"Confirm"} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationUserCard

