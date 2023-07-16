import React, { useContext, useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import { useSearchParams } from 'next/navigation'
import MessageBody from './MessageBody'
import SideBar from '../Sidebar'
import UserContext from '@/context/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { Conversation } from '@/interfaces/Conversation'
import { MessageFooter } from './MessageFooter'

const Home = () => {
  const conversationId = useSearchParams().get("chat")
  const UserState = useContext(UserContext)
  const [conversation, setConversation] = useState<Conversation | null>(null)

  useEffect(() => {
    if (conversationId) {
      const unSubscribe = onSnapshot(
        doc(db, "conversations", conversationId),
        { includeMetadataChanges: true },
        (doc) => {
          setConversation(doc.data() as Conversation)
          // ...
        });
        return () => unSubscribe()
      }
    }, [conversationId])
    // console.log(conversation)

  return (
    <div className="flex md:w-1/1">
      <SideBar UserState={UserState} />
      <div className='w-full'>
        <div className='h-[100vh] overflow-y-scroll'>
          <MessageHeader conversation={conversation} />
          <MessageBody conversation={conversation} />
          {conversation && <MessageFooter conversationId={conversationId}
            messageUserId={UserState.state.id} />}
        </div>
      </div>
    </div>
  )
}

export default Home