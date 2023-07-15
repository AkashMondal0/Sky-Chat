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

const UserCard = () => {
    const router = useRouter()
    return (
        <div>
            <ListItem
            className='cursor-pointer my-1'
             onClick={() => {
                router.push(`?chat=${"weyewofwufwoeu"}`)
            }}>
                <ListItemPrefix>
                    <Avatar variant="circular" alt="candice" src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSQrLx_x-b7xQaqKDqbkTHFfxhnlJPYSOksuJdOGpf3n6GlmXXtzifqrQbjb8G3VoGpbr6y8u_BbhyCuP0" />
                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Tania Andrew
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