import { User, UserState } from '@/interfaces/User'
import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import { BtnInstagram } from '@/components/Button/Button'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import { CreateConversation } from '@/services/firebase/Conversation'
import { Conversation } from '@/interfaces/Conversation'
import uuid4 from 'uuid4'
import Card from './Card'
import useUser from '@/hooks/states/useUser'

interface notification {
    onTabChange: (value: steps) => void
}
const Notification: React.FC<notification> = ({
    onTabChange,
}) => {
    const currentUser = useUser()

    const handle = async (friendId: string, FriendRequestId: string) => {
        RemoveFriendRequest(FriendRequestId, currentUser.state, friendId)
        CreateConversation({
            currentUserId: currentUser.state.id,
            FriendId: friendId
        })
    }
    return <>
        <div className='flex items-center gap-2 m-4'>
            <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
            <Typography variant="h4">Notification</Typography>
        </div>
        <div className='text-sm cursor-pointer justify-end p-4 items-center flex h-4' onClick={() => { onTabChange("requestUserList") }}>
            <Typography variant="h6">Send Request</Typography>
        </div>
        <div>
            {currentUser.state.FriendRequest?.map((item, index) => {
                const { id, receiver, keyValue } = item
                return keyValue == "RECEIVER" && <Card
                    key={index}
                    profileImg={receiver?.image}
                    name={receiver?.name}
                    activeUser={receiver?.activeUser}
                    type={keyValue}
                    email={receiver?.email}
                    id={receiver?.id}
                    right={
                        <>
                            <BtnInstagram
                                danger
                                onClick={() => { RemoveFriendRequest(id, currentUser.state, receiver.id) }}
                                label={"Cancel"} />
                            <BtnInstagram
                                onClick={() => { handle(receiver.id, id) }}
                                label={"Confirm"} /></>
                    }
                />
            })}
        </div>
    </>
}

export default Notification
