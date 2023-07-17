/* eslint-disable react-hooks/exhaustive-deps */
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
    const { friend, conversation } = localDataFriends

    return (
        <div onClick={() => { router.push(`/?chat=${friend.id}`) }}>
            <ListItem
                className='cursor-pointer my-1'>
                <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src={"https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709"} />
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