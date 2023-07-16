/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@/app/Material"
import { GetUserData } from '@/services/firebase/UserDoc'
import { User, initialState } from '@/interfaces/User'

interface UserCardProps {
    userId: string
}

const UserCard: React.FC<UserCardProps> = ({
    userId
}) => {
    const [UserCardState, setUserCardState] = useState<User>(initialState)
    const start = async () => {
        try {
            const getUser = await GetUserData(userId) as User
            setUserCardState(getUser)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        start()
        console.log("UserCard")
    }, [userId])

    return (
        <div>
            <ListItem
                className='cursor-pointer my-1'>
                <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src={"https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709"} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {UserCardState?.name || "Loading..."}
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