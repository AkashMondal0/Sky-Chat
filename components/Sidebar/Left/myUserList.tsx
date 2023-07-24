import React, { useEffect, useState } from 'react'
import { Button, Card, List, ListItem, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@/app/Material'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'
import { UserState, initialUser } from '@/interfaces/User'
import useUser from '@/hooks/states/useUser'
import { useRouter } from 'next/navigation'
import { RemoveToken } from '@/functions/localData'
import routesName from '@/routes'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import useConversation from '@/hooks/states/useConversation'
import dynamic from 'next/dynamic'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'

const ConversationCard = dynamic(() => import('../../Card/ConversationCard',), {
    loading: () => <div>Loading</div>,
    ssr: false
})

interface MyUserList {
    onTabChange: (value: steps) => void
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
}) => {
    const router = useRouter()
    const currentUser = useUser()
    const currentConversation = useConversation()
    const [input, setInput] = useState<string>('')

    const logout = () => {
        UpdateUserStatus(currentUser.state.id, false)
        RemoveToken()
        router.replace(routesName.auth)
        currentUser.setUser(initialUser)
        currentConversation.reset()
    }


    const indicator = (<div className='w-2 h-2 bg-red-400 rounded-full'></div>)

    return (
        <>{currentUser.state.id && <div>
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
                    <AiOutlineSearch size={20}/>
                    <input className='px-2 focus:disabled:outline-none 
                       focus:outline-none w-full'
                        type="text" placeholder='Search' value={input}
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <Typography variant="h6">Message</Typography>
                    <div className='text-sm cursor-pointer flex' onClick={() => { onTabChange("notification") }}>
                        Notification
                        {currentUser.state?.FriendRequest.find(item => item.keyValue === "RECEIVER") && indicator}
                    </div>
                </div>
            </div>

            <div className='pt-5 px-1'>
                {currentUser.state.Conversations.sort(function (a, b) {
                    // sort by date
                    var dateA = new Date(a.lastMessageDate).getTime();
                    var dateB = new Date(b.lastMessageDate).getTime();
                    return dateA > dateB ? 1 : -1;
                })?.reverse()?.filter((item) => {
                    // filter by name
                    const friendId = item.personal.find((u: string) => u !== currentUser.state.id)
                    if (friendId === "") {
                        return item;
                    } else if (friendId?.toLowerCase().includes(input.toLowerCase())) {
                        return item;
                    }
                }).map((item, index) => {
                    // get friend id
                    const friendId = item.personal.find((u: string) => u !== currentUser.state.id) || ""
                    return <ConversationCard key={index} conversation={item} friendId={friendId} />
                })}
            </div>
        </div>}
        </>
    )
}

export default MyUserList
