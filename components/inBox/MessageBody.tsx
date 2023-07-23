import React, { useEffect, useRef, useState } from 'react'
import MessageCard from '../Card/MessageCard'
import { UserState } from '@/interfaces/User'
import { timeFormat, dateFormat } from '@/functions/dateTimeFormat'
import { Conversation } from '@/interfaces/Conversation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { MessageData } from '@/interfaces/Message'
import useConversation from '@/hooks/states/useConversation'


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
    const unSubscribe = onSnapshot(
      doc(db, "UserMessage", conversation.MessageDataId),
      { includeMetadataChanges: true },
      (doc) => {
        setMessageData(doc.data() as MessageData)
      });
    return () => unSubscribe()
  }, [conversation.MessageDataId])

  // console.log(messageData)
  useEffect(() => {
    console.log("scrolling") // TODO: remove this
    scrollToBottom()// TODO: remove this
  }, [messageData?.messages]);


  return (
    <div>
      <div className='h-[85vh] overflow-y-scroll pt-3 px-2'>
        <>{messageData?.messages.filter((value, index, dateArr) => index === dateArr.findIndex((t) => (dateFormat(t.date) === dateFormat(value.date)))) // this is dateARRAY day by day 
          .map((item, index) => {
            return <div className='' key={index}>
              <div className='flex gap-3 w-full justify-center'>
                <p> {dateFormat(item.date)}</p>
                <p>{timeFormat(item.date)}</p>
              </div>

              {/* this days messages ==> item.date */}
              <div>
                {messageData.messages?.map((message, index) => {
                  return dateFormat(item.date) === dateFormat(message.date) &&
                    <MessageCard
                      key={index}
                      Message={message}
                      isSender={message.messageUserId === id}
                      ProfileImageUrl={message.messageUserId === id ? image : image
                        || '/images/user.png'}
                      setSelectedMessage={setSelectedMessage}
                      selectedMessage={selectedMessage}
                    />
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