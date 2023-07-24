/* eslint-disable @next/next/no-img-element */
import { ListItemPrefix, Typography } from '@/app/Material'
import useUser from '@/hooks/states/useUser'
import { User, friendRequest, initialUser } from '@/interfaces/User'
import { GetUserData } from '@/services/firebase/UserDoc'
import React, { useEffect, useState } from 'react'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import { BtnInstagram } from '@/components/Button/Button'
import { Conversation } from '@/interfaces/Conversation'
import { CreateConversation } from '@/services/firebase/Conversation'

interface UserCardProps {
    UserId: string
    item: friendRequest
}
const NotificationUserCard: React.FC<UserCardProps> = ({
    UserId,
    item
}) => {
    const currentUser = useUser()

    const [user, setUsers] = useState<User>(initialUser)

    const get = async () => {
        const user = await GetUserData(UserId) as User
        setUsers(user)
    }

    useEffect(() => {
        get()
    }, [])

    const handle = async (friendId: string, FriendRequestId: string) => {
        // console.log(FriendRequestId, currentUser.state.id, friendId)
       await CreateConversation(
            currentUser.state, // currentUser id
            user // friend data
        )
        RemoveFriendRequest(FriendRequestId, currentUser.state.id, friendId)
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
                                {user.name || "No Name"}
                            </Typography>
                            <Typography variant="small" color="gray" className="font-normal">
                                {user.email || "No Email"}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        <>
                            <BtnInstagram
                                danger
                                onClick={() => { RemoveFriendRequest(item.id, currentUser.state.id, user.id) }}
                                label={"Cancel"} />
                            <BtnInstagram
                                onClick={() => { handle(user.id, item.id) }}
                                label={"Confirm"} />
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationUserCard

