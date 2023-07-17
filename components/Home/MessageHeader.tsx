/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@/app/Material"
import { useRouter, useSearchParams } from 'next/navigation'
import { BsCameraVideo, BsTelephone } from 'react-icons/bs'
import { RxInfoCircled } from 'react-icons/rx'
import { Conversation } from '@/interfaces/Conversation'
import { UserContextIn, friend, initialFriend } from '@/interfaces/User'
import useRightSideBar from '@/hooks/useRightSideBar'

interface MessageHeader {
  conversation: Conversation
  UserState: UserContextIn
}

const MessageHeader: React.FC<MessageHeader> = ({ conversation, UserState }) => {
  const router = useRouter()
  const friendIdParams = useSearchParams().get("chat")
  const [friend, setFriend] = useState<friend>(initialFriend)
  const RightSideBar = useRightSideBar()
  useEffect(() => {
    if (friendIdParams) {
      const { localDataFriends } = UserState.state
      const friend = localDataFriends?.find((friend) => friend?.friend?.id === friendIdParams)
      setFriend(friend as friend)
    }
  }, [UserState.state, friendIdParams])

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
            {friend.friend.name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {friend.friend.email}
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
            <RxInfoCircled size={24} onClick={() => {
              RightSideBar.sideBar ? RightSideBar.closeSideBar() : RightSideBar.openSideBar()
            }} />
          </li>
        </ul>
      </div>

    </div>
  )
}

export default MessageHeader