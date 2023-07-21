import React, { useEffect, useRef } from 'react'
import MessageCard from '../Card/MessageCard'
import { UserState } from '@/interfaces/User'
import { Conversation } from '@/interfaces/Conversation'
import useFriend from '@/hooks/states/useFriend'
import { timeFormat, dateFormat } from '@/functions/dateTimeFormat'


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
        <>{conversation?.messages.filter((value, index, dateArr) => index === dateArr.findIndex((t) => (dateFormat(t.date) === dateFormat(value.date)))) // this is dateARRAY day by day 
          .map((item, index) => {
            return <div className='' key={index}>
              <div className='flex gap-3 w-full justify-center'>
                <p> {dateFormat(item.date)}</p>
                <p>{timeFormat(item.date)}</p>
              </div>

              {/* this days messages ==> item.date */}
              <div>
                {conversation?.messages.map((message, index) => {
                  return dateFormat(item.date) === dateFormat(message.date) && <MessageCard
                    key={index}
                    Message={message}
                    isSender={message.messageUserId === id}
                    ProfileImageUrl={message.messageUserId === id ? image : Friend?.state?.details.image
                      || 'https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709'} />

                })}
              </div>
            </div>
          })}</>



        <div className='h-8' ref={messagesEndRef} ></div>
      </div>
    </div>
  )
}

export default MessageBody