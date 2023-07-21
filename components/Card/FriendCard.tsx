"use client";

import React from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@/app/Material"
import { friend } from '@/interfaces/User'
import { useRouter } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation';

interface UserCardProps {
    localDataFriends: friend
}

const UserCard: React.FC<UserCardProps> = ({
    localDataFriends
}) => {
    const router = useRouter()
    const { details, conversation } = localDataFriends
    const currentConversation = useConversation()

    return (
        <div onClick={() => {
            router.push(`/?chat=${details.id}`) // TODO push to change clicked function or method
        }}>
            <ListItem
                className='cursor-pointer my-1'>
                <ListItemPrefix>
                    <Avatar color='green' withBorder={details.activeUser}
                        variant="circular" alt="candice" src={details.image} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {details?.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {currentConversation?.state.lastMessage}
                    </Typography>
                </div>
            </ListItem>
        </div>
    )
}

export default UserCard