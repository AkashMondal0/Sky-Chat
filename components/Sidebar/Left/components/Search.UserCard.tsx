/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from 'react'
import {
    ListItemPrefix,
    Typography,
} from "@/app/Material"

interface UserCardProps {
    profileImg: string
    name: string
    activeUser: boolean
    email: string
    id: string
    type?: string
    right?: React.ReactNode
}

const SearchUserCard: React.FC<UserCardProps> = ({
    name,
    profileImg,
    activeUser,
    email,
    id,
    type,
    right
}) => {
    return (
        <div >
            <div className='cursor-pointer flex justify-between items-center py-3 mx-1
             px-2 rounded-xl hover:bg-gray-100'>
                <div className='flex justify-between items-center'>
                    <ListItemPrefix>

                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={profileImg || "/images/user.png"} />
                    </ListItemPrefix>
                    <div className='break-all'>
                        <p className="break-all font-semibold text-base">
                            {name || "No Name"}
                        </p>
                        <p className="break-all text-sm">
                            {email || "No Email"}
                        </p>
                    </div>
                </div>
                <div className='flex gap-1'>
                    {right}
                </div>
            </div>
        </div>
    )
}

export default SearchUserCard