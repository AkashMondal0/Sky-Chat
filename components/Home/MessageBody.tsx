import React from 'react'
import MessageCard from '../Card/MessageCard'
import { UserContextIn } from '@/interfaces/User'
import { Conversation } from '@/interfaces/Conversation'

interface MessageBodyProps {
  conversation: Conversation | null
  UserState: UserContextIn
}
const MessageBody: React.FC<MessageBodyProps> = ({
  conversation,
  UserState
}) => {
  const { id } = UserState.state

  return (
    <div>
      <div className='h-[85vh] overflow-y-scroll'>
        {conversation?.messages.map((message, index) => {
          const isSender = message.messageUserId === id
          // console.log(message.messageUserId === id)
          return <MessageCard
            key={index}
            message={message.message}
            isSender={isSender}
            date={message.createdAt} imageUrl={'https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709'} />
        })}
        <div className='h-8'></div>
      </div>
    </div>
  )
}

export default MessageBody