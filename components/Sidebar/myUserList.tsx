import React from 'react'
import { Card, List, Typography } from '@/app/Material'
import UserCard from '../Card/userCard'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'

interface MyUserList {
    onTabChange: (value: steps) => void
}
const MyUserList: React.FC<MyUserList> = ({ onTabChange }) => {

    const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 3, 4, 5, 6, 7, 8, 9]
    return (
        <>
            <div className='h-[10vh] sticky top-0 z-50 px-4 py-2 bg-white'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">Akash Mondal</Typography>
                    <LuEdit size={26} className='cursor-pointer' />
                </div>
                <div className='flex justify-between mt-4'>
                    <Typography variant="h6">Message</Typography>
                    <p className='text-sm cursor-pointer' onClick={() => { onTabChange("requestUserList") }}>Requests</p>
                </div>
            </div>
            <List>
                {dummyData.map((item, index) => (
                    <UserCard key={index} />
                ))}
            </List></>
    )
}

export default MyUserList
