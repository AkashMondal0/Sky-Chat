/* eslint-disable @next/next/no-img-element */
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

import { BsCameraVideo, BsTelephone } from 'react-icons/bs'
import { RxInfoCircled } from 'react-icons/rx'

const MessageHeader = () => {
  const router = useRouter()

  return (
    <div className='h-[60px] w-1/1 
    border-[1px] border-l-[0px] 
    bg-white
    flex justify-between sticky top-0 py-3'>

      <div className='flex items-center p-2 cursor-pointer'
        onClick={() => {
          router.push(`?chat=${"weyewofwufwoeu"}`)
        }}>
        <ListItemPrefix>
          <Avatar
            size="md"
            variant="circular"
            alt="candice"
            src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSQrLx_x-b7xQaqKDqbkTHFfxhnlJPYSOksuJdOGpf3n6GlmXXtzifqrQbjb8G3VoGpbr6y8u_BbhyCuP0" />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            Tania Andrew
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Software Engineer
          </Typography>
        </div>
      </div>
      <div className='flex items-center px-5 cursor-pointer'>
        <ul className='flex gap-4'>
          <li>
            <BsTelephone size={24} />
          </li>
          <li>
            <BsCameraVideo size={24} />
          </li>
          <li>
            <RxInfoCircled size={24} />
          </li>
        </ul>
      </div>

    </div>
  )
}

export default MessageHeader