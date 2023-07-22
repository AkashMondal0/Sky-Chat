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
import { UserState } from '@/interfaces/User'
import useRightSideBar from '@/hooks/useRightSideBar'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation'
import { timeAgoFormat } from '@/functions/dateTimeFormat'
import { Conversation } from '@/interfaces/Conversation'
import useUser from '@/hooks/states/useUser'
import routesName from '@/routes'

interface MessageHeader {
  UserState: UserState
  conversation: Conversation
}

const MessageHeader: React.FC<MessageHeader> = ({
  UserState,
  conversation
}) => {
  const CurrentUser = useUser()
  const RightSideBar = useRightSideBar()
  const router = useRouter()
  const { messages, personal: { receiver, sender } } = conversation
  const friend = CurrentUser.state.id === receiver.id ? sender : receiver
  const currentConversation = useConversation()

  return (
    <div className='h-[60px] w-1/1 
    border-[1px] border-l-[0px] 
    bg-white
    flex justify-between sticky top-0 py-3'>

      <div className='flex items-center p-2 cursor-pointer'>
        <BiArrowBack className='mr-2 md:hidden' size={28} onClick={() => {
          router.replace(routesName.home)
          currentConversation.exitCurrentConversation()
        }} />
        <ListItemPrefix>
          <img className='w-12 h-12 rounded-full object-cover border-[1px] border-black'
            alt="not found"
            src={friend.image || "/images/user.png"} />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            {friend.name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {timeAgoFormat(friend.lastTimeOnline)|| "offline"} Last Online
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