import React from 'react'
import { Card, List, Typography } from '@/app/Material'
import UserCard from '../Card/userCard'
import { LuEdit } from 'react-icons/lu'
import { steps } from '.'
import { UserContextIn } from '@/interfaces/User'
import { useRouter } from 'next/navigation'

interface MyUserList {
    onTabChange: (value: steps) => void
    UserState: UserContextIn
}
const MyUserList: React.FC<MyUserList> = ({
    onTabChange,
    UserState
}) => {
    const router = useRouter()
    const { Contacts } = UserState.state
    const handle = async (id: string) => {
        router.push(`?chat=${id}`)
    }
    return (
        <>
            <div className='h-[90px] sticky top-0 z-50 px-4 py-2 bg-white'>
                <div className='justify-between items-center flex pt-1'>
                    <Typography variant="h4">Akash Mondal</Typography>
                    <LuEdit size={26} className='cursor-pointer' onClick={() => { onTabChange("searchUserList") }} />
                </div>
                <div className='flex justify-between pt-4'>
                    <Typography variant="h6">Message</Typography>
                    <p className='text-sm cursor-pointer' onClick={() => { onTabChange("requestUserList") }}>Requests</p>
                </div>
            </div>
            <List>
                {Contacts.map((item, index) => (
                    <div key={index} onClick={() => { handle(item.conversation) }}>
                        <UserCard
                            key={index}
                            userId={item.friend} />
                    </div>
                ))}
            </List>
        </>
    )
}

export default MyUserList
