import React, { useEffect, useState } from 'react'
import { List, Typography } from '@/app/Material'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'
import { UserState, initialUser } from '@/interfaces/User'
import useUser from '@/hooks/states/useUser'
import { useRouter } from 'next/navigation'
import { RemoveToken } from '@/functions/localData'
import routesName from '@/routes'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import ConversationCard from '../../Card/ConversationCard'
import useConversation from '@/hooks/states/useConversation'


interface MyUserList {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
    UserState,
}) => {
    const [conversations, setConversations] = useState(UserState.state.Conversations)
    const router = useRouter()
    const userState = useUser()
    const currentConversation = useConversation()

    const logout = () => {
        UpdateUserStatus(userState.state.id, false)
        RemoveToken()
        router.replace(routesName.auth)
        userState.setUser(initialUser)
        currentConversation.reset()
    }
    useEffect(() => {
        const realtime = userState.state?.Conversations?.sort((a, b) => {
            return b.lastMessageDate - a.lastMessageDate // sort by updateDate
        })
        setConversations(realtime)
    }, [userState.state?.Conversations])
    const indicator = (<div className='w-2 h-2 bg-red-400 rounded-full'></div>)

    return (
        <>{userState.state.id && <div>
            <div className='h-[90px] sticky top-0 z-50 px-4 bg-white my-4'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">{userState.state.name}</Typography>
                    {userState.state.activeUser && <div className='cursor-pointer' onClick={logout}>Logout</div>}
                    <LuEdit size={26} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                </div>
                <div className='flex justify-between pt-4 mt-3'>
                    <Typography variant="h6">Message</Typography>
                    <div className='text-sm cursor-pointer flex' onClick={() => { onTabChange("notification") }}>
                        Notification
                        {userState.state?.FriendRequest.find(item => item.keyValue === "RECEIVER") && indicator}
                    </div>
                </div>
            </div>
            <List>
                {conversations.reverse().map((item, index) => {
                    // console.log(item.id)
                    return item.type === "PERSONAL" && <ConversationCard
                        key={index} conversation={item}

                    />
                })}
            </List>
        </div>}</>
    )
}

export default MyUserList
