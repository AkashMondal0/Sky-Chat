/* eslint-disable @next/next/no-img-element */
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
            <div className='cursor-pointer flex justify-between items-center py-3 mx-1
             px-2 rounded-xl hover:bg-gray-100'>
                <div className='flex justify-between items-center'>
                    <ListItemPrefix>
                      
                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={profileImg || "/images/user.png"} />
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
            </div>
        </div>
    )
}

export default UserCard