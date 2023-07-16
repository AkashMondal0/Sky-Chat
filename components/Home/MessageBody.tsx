import React, { useEffect } from 'react'
import MessageCard from '../Card/MessageCard'
import { MessageFooter } from './MessageFooter'
import { UserContextIn } from '@/interfaces/User'
import { Conversation } from '@/interfaces/Conversation'

interface MessageBodyProps {
  conversation: Conversation | null
}
const MessageBody: React.FC<MessageBodyProps> = ({
  conversation
}) => {


  // console.log(conversation)
  return (
    <div>
      {/* <div className='h-[85vh] overflow-y-scroll'>
        {conversation?.messages.map((message, index) => (
          <MessageCard key={index} />
        ))}
      </div> */}

      <p className='w-full text-center font-medium text-sm'>Fri 22:48</p>
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </div>
  )
}

export default MessageBody