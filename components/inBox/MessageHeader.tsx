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
import { BsCameraVideo, BsTelephone } from 'react-icons/bs'
import { RxInfoCircled } from 'react-icons/rx'
import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { UserState, initialFriend } from '@/interfaces/User'
import useRightSideBar from '@/hooks/useRightSideBar'
import useFriend from '@/hooks/states/useFriend'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation'
import { timeFormat } from '@/functions/dateTimeFormat'

interface MessageHeader {
  conversation: Conversation
  UserState: UserState
}

const MessageHeader: React.FC<MessageHeader> = () => {
  const friend = useFriend()
  const RightSideBar = useRightSideBar()
  const router = useRouter()
  const conversation = useConversation()

  return (
    <div className='h-[60px] w-1/1 
    border-[1px] border-l-[0px] 
    bg-white
    flex justify-between sticky top-0 py-3'>

      <div className='flex items-center p-2 cursor-pointer'>
        <BiArrowBack className='mr-2 md:hidden' size={28} onClick={() => {
          router.back()
          friend.setUser(initialFriend)
          conversation.setConversation(initialConversation)
        }} />
        <ListItemPrefix>
          <Avatar
            withBorder={friend.state.details.activeUser}
            color='green'
            size="md"
            variant="circular"
            alt="candice"
            src={friend.state.details.image} />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            {friend.state.details.name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {timeFormat(friend.state.details.lastTimeOnline) || "offline"}
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