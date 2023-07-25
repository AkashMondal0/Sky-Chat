import React from 'react'
import { steps } from '..'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
import { BtnInstagram } from '@/components/Button/Button'
import { RemoveFriendRequest } from '@/services/firebase/friendRequest'
import useUser from '@/hooks/states/useUser'
import RequestUserCard from '../components/RequestUserCard'
interface requestUserList {
    onTabChange: (value: steps) => void
}
const RequestUserList: React.FC<requestUserList> = ({
    onTabChange,
}) => {
    const currentUser = useUser()
    return <>
        <div className='flex items-center gap-2 m-4'>
            <BiArrowBack className='cursor-pointer' size={30}
                onClick={() => { onTabChange("notification") }}
            />
            <Typography variant="h4">Requests</Typography>
        </div>
        <div>
            {currentUser.state?.FriendRequest?.map((item, index) => {
                const { id, receiverId, keyValue } = item
                // receiver means the user who send the request to the current user
                return keyValue === "SENDER" && <RequestUserCard key={receiverId} UserId={receiverId}
                    right={<>
                        <BtnInstagram
                            danger
                            onClick={() => {
                                RemoveFriendRequest(id, currentUser.state.id, receiverId)
                            }}
                            label={"Cancel"} />
                    </>} />
            })}
        </div>
    </>
}

export default RequestUserList

