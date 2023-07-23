import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import { UserState } from '@/interfaces/User'
import UserCard from '@/components/Card/conversationUserCard'
import { BtnInstagram } from '@/components/Button/Button'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import Card from './Card'
interface requestUserList {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const requestUserList: React.FC<requestUserList> = ({
    onTabChange,
    UserState
}) => {

    return <>
        <div className='flex items-center gap-2 m-4'>
            <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("notification") }} />
            <Typography variant="h4">Requests</Typography>
        </div>
        <div>
            {UserState.state.FriendRequest?.map((item, index) => {
                const { id, receiver, keyValue } = item

                // receiver means the user who send the request 
                // sender means the user who receive the request
                return keyValue === "SENDER" && <Card
                    key={index}
                    type={id}
                    profileImg={receiver?.image}
                    name={receiver?.name}
                    activeUser={receiver?.activeUser}
                    email={receiver?.email}
                    id={receiver?.id}
                    right={
                        <>
                            <BtnInstagram
                                danger
                                onClick={() => {
                                    RemoveFriendRequest(id, UserState.state, receiver.id)
                                }}
                                label={"Cancel"} />
                        </>
                    }
                />
            })}
        </div>
    </>
}

export default requestUserList

