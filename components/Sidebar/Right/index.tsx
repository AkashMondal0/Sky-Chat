import React from 'react'
import SideContainer from '../SideContainer'
import { Avatar, ListItem, ListItemPrefix, Typography } from '@/app/Material'
import useFriend from '@/hooks/states/useFriend'

interface RightSideBar {

}
const RightSideBar: React.FC<RightSideBar> = ({

}) => {

    const friend = useFriend().state

    return (
        <SideContainer>
            <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-4 bg-white'>
                <Typography variant="h5">Details</Typography>
            </div>
            <div className='cursor-pointer flex p-4 border-t-[1px] border-b-[1px] border-gray-300 my-5 items-center hover:bg-gray-100'>
                <ListItemPrefix>
                    <Avatar color='green' withBorder={friend?.details.activeUser} size='xl'
                        variant="circular" alt="candice" src={friend?.details.image} />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {friend?.details.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        Software Engineer
                    </Typography>
                </div>
            </div>
            <div className='m-5'>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Report
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Block
                </Typography>
                <Typography variant="h6" color="red" className="font-semibold text-base my-4 cursor-pointer">
                    Delete
                </Typography>
            </div>
        </SideContainer>
    )
}

export default RightSideBar
