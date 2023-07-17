import React from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Typography } from '@/app/Material'
interface requestUserList {
    onTabChange: (value: steps) => void
}
const requestUserList: React.FC<requestUserList> = ({ onTabChange }) => {
    return <div className='p-3 flex items-center gap-5'>
        <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
        <Typography variant="h4">Requests</Typography>
    </div>
}

export default requestUserList