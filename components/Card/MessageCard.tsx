import { Avatar } from '@/app/Material'
import React from 'react'

interface MessageCardProps {
  message: string
  isSender: boolean
  date?: Date
  imageUrl: string
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isSender,
  date,
  imageUrl
}) => {
  return (
    <div className={`w-full flex ${isSender ? "justify-end" : "justify-start"} p-3`}>
      {!isSender && <Avatar variant="circular" alt="candice" size='sm' src={imageUrl} />}
      <div className={`p-1 px-4 mx-2
       ${!isSender ? "bg-gray-200 text-black" : "bg-blue-400 text-white"}
       break-words
       flex rounded-2xl  
       max-w-[70vw]
       md:max-w-[30vw]`}>
        {message}
      </div>
      {isSender && <Avatar variant="circular" alt="candice" size='sm' src={imageUrl} />}
    </div>
  )
}

export default MessageCard

