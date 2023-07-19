import React, { useEffect, useRef } from 'react'
import MessageCard from '../Card/MessageCard'
import { UserContextIn, UserState } from '@/interfaces/User'
import { Conversation } from '@/interfaces/Conversation'
import useFriend from '@/hooks/states/useFriend'

interface MessageBodyProps {
  conversation: Conversation | null
  UserState: UserState
}
const MessageBody: React.FC<MessageBodyProps> = ({
  conversation,
  UserState
}) => {
  const { id, image } = UserState.state
  const Friend = useFriend()
  const messagesEndRef = useRef(null) as any

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    console.log("scrolling") // TODO: remove this
    scrollToBottom()
  }, [conversation?.messages]);

  return (
    <div>
      <div className='h-[85vh] overflow-y-scroll pt-3 px-2'>
        {conversation?.messages.map((message, index) => {
          const isSender = message.messageUserId === id
          return <MessageCard
            key={index}
            Message={message}
            isSender={isSender}
            ProfileImageUrl={isSender ? image : Friend?.state?.friend.image || 'https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709'} />
        })}
        <div className='h-8' ref={messagesEndRef} ></div>
      </div>
    </div>
  )
}

export default MessageBody