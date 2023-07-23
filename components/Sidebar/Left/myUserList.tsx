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
// import ConversationCard from '../../Card/ConversationCard'
import useConversation from '@/hooks/states/useConversation'
import dynamic from 'next/dynamic'

const ConversationCard = dynamic(() => import('../../Card/ConversationCard',), {
    loading: () => <div>Loading</div>,
    ssr: false
})


interface MyUserList {
    onTabChange: (value: steps) => void
    UserState: UserState
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
    UserState,
}) => {
    const [conversations, setConversations] = useState<string[]>([])
    const router = useRouter()
    const currentUser = useUser()
    const currentConversation = useConversation()

    const logout = () => {
        UpdateUserStatus(currentUser.state.id, false)
        RemoveToken()
        router.replace(routesName.auth)
        currentUser.setUser(initialUser)
        currentConversation.reset()
    }
    useEffect(() => {
        // const realtime = currentUser.state?.Conversations?.sort((a, b) => {
        //     return b.lastMessageDate - a.lastMessageDate // sort by updateDate
        // })
        setConversations(UserState.state.Conversations)
    }, [UserState.state?.Conversations])
    const indicator = (<div className='w-2 h-2 bg-red-400 rounded-full'></div>)

    return (
        <>{currentUser.state.id && <div>
            <div className='h-[90px] sticky top-0 z-50 px-4 bg-white my-4'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">{UserState.state.name}</Typography>
                    {UserState.state.activeUser && <div className='cursor-pointer' onClick={logout}>Logout</div>}
                    <LuEdit size={26} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                </div>
                <div className='flex justify-between pt-4 mt-3'>
                    <Typography variant="h6">Message</Typography>
                    <div className='text-sm cursor-pointer flex' onClick={() => { onTabChange("notification") }}>
                        Notification
                        {UserState.state?.FriendRequest.find(item => item.keyValue === "RECEIVER") && indicator}
                    </div>
                </div>
            </div>
            <List>
                {conversations.reverse().map((item, index) => {
                    // console.log(item.id)
                    return <ConversationCard key={index} conversationId={item}/>
                })}
            </List>
        </div>}</>
    )
}

export default MyUserList
