import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@/app/Material'
import { LuEdit } from 'react-icons/lu'
import { steps } from '..'
import { initialUser } from '@/interfaces/User'
import useUser from '@/hooks/states/useUser'
import { useRouter } from 'next/navigation'
import { RemoveToken } from '@/functions/localData'
import routesName from '@/routes'
import { GetUserData, UpdateUserStatus } from '@/services/firebase/UserDoc'
import useConversation from '@/hooks/states/useConversation'
import dynamic from 'next/dynamic'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import Badge from '@/components/Badge'
import LoadingBox from '@/components/loadingBox'


const ConversationCard = dynamic(() => import('../components/ConversationCard',), {
    loading: () => <LoadingBox className='h-20 w-full rounded-2xl my-2' />,
    ssr: false
})

interface MyUserList {
    onTabChange: (value: steps) => void
}
const MyConversationList: React.FC<MyUserList> = ({
    onTabChange,
}) => {
    const router = useRouter()
    const currentUser = useUser()
    const currentConversation = useConversation()
    const [input, setInput] = useState<string>('')

    const logout = () => {
        var uid = currentUser.state.id
        RemoveToken()
        currentUser.setUser(initialUser)
        currentConversation.reset()
        router.replace(routesName.auth)
        UpdateUserStatus(uid, false)
    }

    const NotificationCount = currentUser.state.FriendRequest?.filter((item) => item.keyValue == "RECEIVER").length

    return (
        <>{currentUser.state?.id && <div>
            <div className='h-[100px] sticky top-0 z-50 px-4 bg-white my-4'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">{currentUser.state.name}</Typography>
                    <div className='flex items-center gap-3'>
                        <LuEdit size={24} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                        <Menu placement="left-end">
                            <MenuHandler>
                                <div><HiOutlineDotsVertical size={24} /></div>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Setting</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                {/* search */}
                <div className='flex my-3 items-center w-full p-2 border-gray-300
                       border-[1px]  rounded-xl'>
                    <AiOutlineSearch size={20} />
                    <input className='px-2 focus:disabled:outline-none 
                       focus:outline-none w-full'
                        type="text" placeholder='Search' value={input}
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className='flex justify-between items-end h-8'>
                    <Typography variant="h6">Message</Typography>
                    <Badge
                        disabled={NotificationCount <= 0}
                        onclick={() => { onTabChange("notification") }}
                        content={NotificationCount}>
                        <div className=''>Notification</div>
                    </Badge>
                </div>
            </div>

            <div className='pt-5 px-1'>
                {currentUser.state.Conversations.sort(function (a, b) {
                    // sort by date
                    var dateA = new Date(a.lastMessageDate).getTime();
                    var dateB = new Date(b.lastMessageDate).getTime();
                    return dateA > dateB ? 1 : -1;
                })?.reverse()?.filter((item) => {
                    if (item.friendData.name == "") {
                    } else if (item.friendData.name?.toLowerCase().includes(input.toLowerCase())) {
                        return item;
                    }
                }).map((item, index) => {
                    // get friend id
                    const friendId = item.friendData.id
                    return <ConversationCard key={index} conversationData={item} friendId={friendId} />
                })}
            </div>
        </div>}
        </>
    )
}

export default MyConversationList