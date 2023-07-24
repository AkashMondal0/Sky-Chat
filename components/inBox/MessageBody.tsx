import React, { useEffect, useRef, useState } from 'react'
import MessageCard from './components/MessageCard'
import { UserState } from '@/interfaces/User'
import { timeFormat, dateFormat } from '@/functions/dateTimeFormat'
import { Conversation } from '@/interfaces/Conversation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { MessageData } from '@/interfaces/Message'
import useConversation from '@/hooks/states/useConversation'
import { MessageFooter } from './MessageFooter'
import MessageHeader from './MessageHeader'


interface MessageBodyProps {
  UserState: UserState
  conversation: Conversation
}
const MessageBody: React.FC<MessageBodyProps> = ({
  UserState,
  conversation
}) => {
  const { id, image } = UserState.state
  const messagesEndRef = useRef(null) as any
  const [selectedMessage, setSelectedMessage] = useState("")
  const currentConversation = useConversation()

  const [messageData, setMessageData] = useState<MessageData>({
    id: "",
    messages: [],
    senderMessages: [],
    receiverMessages: [],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    // fetch messages
    const unSubscribe = onSnapshot(
      doc(db, "UserMessage", conversation.MessageDataId),
      { includeMetadataChanges: true },
      (doc) => {
        setMessageData(doc.data() as MessageData)
      });
    // fetch user from state
    return () => unSubscribe()
  }, [conversation.MessageDataId])

  // console.log(messageData)
  useEffect(() => {
    // console.log("scrolling") // TODO: remove this
    scrollToBottom()// TODO: remove this
  }, [messageData?.messages]);


  return (
    <div>

      <div className='min-h-[83vh] mt-5'>
        {messageData?.messages.filter((value, index, dateArr) => index === dateArr.findIndex((t) => (dateFormat(t.date) === dateFormat(value.date)))) // this is dateARRAY day by day 
          .map((item, index) => {
            return <div className='' key={index}>
              <div className='flex gap-3 w-full justify-center'>
                <p className='bg-gray-200 px-1 rounded-md'>{dateFormat(item.date)}</p>
                {/* <p>{timeFormat(item.date)}</p> */}
              </div>

              {/* this days messages ==> item.date */}
              <div>
              {messageData.messages?.map((message, index) => {
                  return dateFormat(item.date) === dateFormat(message.date) &&
                    <MessageCard
                      key={index}
                      Message={message}
                      isSender={message.messageUserId === id}
                      ProfileImageUrl={message.messageUserId === id ? image : currentConversation.Friend.image
                        || '/images/user.png'}
                      setSelectedMessage={setSelectedMessage}
                      selectedMessage={selectedMessage}
                    />
                })}
              </div>
            </div>
          })}
      </div>
      <div className='h-8' ref={messagesEndRef} ></div>
    </div>
  )
}

export default MessageBody