/* eslint-disable react-hooks/exhaustive-deps */
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

interface UserCardProps {
    localDataFriends: friend
}

const UserCard: React.FC<UserCardProps> = ({
    localDataFriends
}) => {
    const router = useRouter()
    const { friend } = localDataFriends

    return (
        <div onClick={() => { router.push(`/?chat=${friend.id}`) // TODO push to change clicked function or method
         }}> 
            <ListItem
                className='cursor-pointer my-1'>
                <ListItemPrefix>
                    <Avatar color='green' withBorder={friend.activeUser}
                    variant="circular" alt="candice" src={friend.image} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {friend?.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Software Engineer
                    </Typography>
                </div>
            </ListItem>
        </div>
    )
}

export default UserCard