/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import SideContainer from '../SideContainer'
import { Avatar, ListItem, ListItemPrefix, Typography } from '@/app/Material'
import useConversation from '@/hooks/states/useConversation'
import GroupCard from '../Left/components/GroupCard'
import useUser from '@/hooks/states/useUser'
import UserCard from '../Left/components/UserCard'

interface RightSideBar {

}
const RightSideBar: React.FC<RightSideBar> = ({

}) => {

    const currentConversation = useConversation()
    const currentUser = useUser()

    if (currentConversation.conversationData.isGroup) {
        const { GroupConversationData: {
            admin,
            groupName,
            groupImage,
            groupMembers,
            CreatedUser
        } } = currentConversation


        return <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-4 bg-white'>
                <Typography variant="h5">{groupName}</Typography>
            </div>
            <div className='Input For User Search'></div>
            <div className='p-1'>
                {groupMembers.map((item) => {
                    const UserData = currentUser.FriendList.find((friend) => friend.id === item.userId)
                    if (item.userId !== currentUser.state.id && UserData) {
                        return <UserCard key={item.id}
                            user={UserData}
                            right={<div>

                            </div>} />
                    }
                })}
            </div>
            <div className='m-5'>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Add Participants
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Exit Group
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Report Group
                </Typography>
            </div>
        </SideContainer>
    }


    return (
        <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-4 bg-white'>
                <Typography variant="h5">Details</Typography>
            </div>
            <div className='cursor-pointer flex p-4 border-t-[1px] border-b-[1px] border-gray-300 my-5 items-center hover:bg-gray-100'>
                <ListItemPrefix>
                    <img className='w-14 h-14 rounded-full object-cover border-[1px] border-black'
                        alt="not found"
                        src={currentConversation.friend.image || "/images/user.png"} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {currentConversation.friend.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {currentConversation.friend.email || "Loading..."}
                    </Typography>
                </div>
            </div>
            <div className='m-5'>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Report
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Block
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Delete
                </Typography>
            </div>
        </SideContainer>
    )
}

export default RightSideBar
