import { User, UserState } from '@/interfaces/User'
import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import UserCard from '@/components/Card/UserCard'
import { BtnInstagram } from '@/components/Button/Button'
import { ConversationRequest } from '@/interfaces/Conversation'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import { CreateConversation } from '@/services/firebase/Conversation'

interface notification {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const Notification: React.FC<notification> = ({
    onTabChange,
    UserState
}) => {
    const handle = async (friend: User, FriendRequestId: string) => {
        const data: ConversationRequest = {
            groupImage: null,
            groupName: null,
            isGroup: false,
            lastMessage: "new friend",
            authorId: UserState.state.id,
            userId: friend.id,
        }
        RemoveFriendRequest(FriendRequestId, UserState.state, friend)
        CreateConversation(data)
    }
    return <div className='p-3'>
        <div className='flex items-center gap-2 my-4'>
            <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
            <Typography variant="h4">Notification</Typography>
        </div>
        <div>
            {UserState.state.FriendRequest?.map((item, index) => {
                const { id, receiver, keyValue } = item
                // console.log(item)
                return keyValue == "RECEIVER" && <UserCard
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
                                onClick={() => { }}
                                label={"Cancel"} />
                            <BtnInstagram
                                onClick={() => { handle(receiver, id) }}
                                label={"Confirm"} /></>
                    }
                />
            })}
        </div>
    </div>
}

export default Notification
