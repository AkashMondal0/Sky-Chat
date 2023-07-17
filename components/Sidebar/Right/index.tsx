import React, { useContext, useEffect, useState } from 'react'
import SideContainer from '../SideContainer'
import { Typography } from '@/app/Material'
import { useSearchParams } from 'next/navigation'
import { UserContextIn, initialFriend } from '@/interfaces/User'
import { friend } from '@/interfaces/User'
import UserContext from '@/context/User/UserContext'

interface RightSideBar {

}
const RightSideBar: React.FC<RightSideBar> = ({

}) => {
    const friendIdParams = useSearchParams().get("chat")
    const [friend, setFriend] = useState<friend>(initialFriend)
    const UserState = useContext<UserContextIn>(UserContext)

    useEffect(() => {
        if (friendIdParams) {
            const { localDataFriends } = UserState.state
            const friend = localDataFriends?.find((friend) => friend?.friend?.id === friendIdParams)
            setFriend(friend as friend)
        }
    }, [UserState.state, friendIdParams])
    return (
        <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-4 bg-white'>
                <Typography variant="h5">Details</Typography>
            </div>
            <Typography variant="h5">{friend.friend.name}</Typography>
        </SideContainer>
    )
}

export default RightSideBar
