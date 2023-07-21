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
import { useRouter } from 'next/navigation'
import { BtnInstagram } from '../Button/Button';

interface UserCardProps {
    profileImg: string
    name: string
    activeUser: boolean
    email: string
    id: string
    type?: string
    right?: React.ReactNode
}

const UserCard: React.FC<UserCardProps> = ({
    name,
    profileImg,
    activeUser,
    email,
    id,
    type,
    right
}) => {
    const router = useRouter()

    // router.push(`/?chat=${id}`) // TODO push to change clicked function or method
    return (
        <div onClick={() => {

        }}>
            <ListItem className='cursor-pointer my-1 flex justify-between items-center'>
                <div className='flex justify-between items-center'>
                    <ListItemPrefix>
                        <Avatar color='green'
                            size='md'
                            withBorder={activeUser}
                            variant="circular"
                            alt="candice" src={profileImg} />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            {name || "No Name"}
                        </Typography>
                        {/* <Typography variant="small" color="gray" className="font-normal">
                            {email || "No Email"}
                        </Typography> */}
                    </div>
                </div>
                <div className='flex gap-1'>
                    {right}
                </div>
            </ListItem>
        </div>
    )
}

export default UserCard