import React, { useContext, useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import { useSearchParams } from 'next/navigation'
import MessageBody from './MessageBody'
import LeftSideBar from '../Sidebar/Left'
import UserContext from '@/context/User/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { Conversation, initialConversation } from '@/interfaces/Conversation'
import { MessageFooter } from './MessageFooter'
import { LiaFacebookMessenger } from 'react-icons/lia'
import { UserContextIn } from '@/interfaces/User'
import RightSideBar from '../Sidebar/Right'
import useRightSideBar from '@/hooks/useRightSideBar'


const Home = () => {
  const friendIdParams = useSearchParams().get("chat")
  const UserState = useContext<UserContextIn>(UserContext)
  const [conversation, setConversation] = useState<Conversation>(initialConversation)
  const rightSideBar = useRightSideBar()

  useEffect(() => {
    const { localDataFriends } = UserState.state
    const findConversationId = localDataFriends.find((item) => {
      if (item.friend.id === friendIdParams) {
        return item
      }
    })?.conversationID as string

    if (friendIdParams) {
      const unSubscribe = onSnapshot(
        doc(db, "conversations", findConversationId),
        { includeMetadataChanges: true },
        (doc) => {
          setConversation({ ...doc.data() as Conversation, id: findConversationId })
          // ...
        });
      return () => unSubscribe()
    }
    // console.log(findConversationId)
  }, [friendIdParams])

  return (
    <div className="flex md:w-1/1">
      <LeftSideBar UserState={UserState} />
      <main className='w-full'>
        <div className='h-[100vh] overflow-y-scroll'>
          {conversation.id ?
            <><MessageHeader UserState={UserState}
              conversation={conversation} />
              <MessageBody conversation={conversation}
                UserState={UserState} />
              <MessageFooter conversationId={conversation.id}
                messageUserId={UserState.state.id} /></>
            : <Empty />}
        </div>
      </main>
      {rightSideBar.sideBar && <RightSideBar />}
    </div>
  )
}

export default Home

const Empty = () => {

  return <>
    <div className='flex w-full justify-center items-center min-h-screen'>
      <div className='text-center'>
        <div className='p-3 border-[2px] rounded-full border-black dark:border-white w-24 h-24 justify-center flex items-center mx-auto'>
          <LiaFacebookMessenger size={80} />
        </div>
        <div className='text-base my-4'>Your messages</div>
        <div className='text-base my-4'>Send private photos and messages to a friend or group</div>
        <button className='bg-blue-500 hover:bg-blue-600 font-semibold text-white p-2 px-4 text-sm rounded-xl'>Send message</button>
      </div>
    </div>
  </>
}