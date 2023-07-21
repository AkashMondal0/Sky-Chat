"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import MessageHeader from './MessageHeader'
import { useSearchParams } from 'next/navigation'
import MessageBody from './MessageBody'
import LeftSideBar from '../Sidebar/Left'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase/config'
import { Conversation } from '@/interfaces/Conversation'
import { MessageFooter } from './MessageFooter'
import { LiaFacebookMessenger } from 'react-icons/lia'
import RightSideBar from '../Sidebar/Right'
import useRightSideBar from '@/hooks/useRightSideBar'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import useConversation from '@/hooks/states/useConversation'
import useUser from '@/hooks/states/useUser'
import { FindFriend } from './inBox'
import useFriend from '@/hooks/states/useFriend'
import { UserState, friend } from '@/interfaces/User'
import SideContainer from '../Sidebar/SideContainer';


const Home = () => {
  const friendIdParams = useSearchParams().get("chat") as string
  const UserState = useUser()
  const conversation = useConversation()
  const rightSideBar = useRightSideBar()
  const { localDataFriends, id } = UserState.state
  const Friend = useFriend()

  useEffect(() => {
    if (friendIdParams) {
      console.log("conversation") // TODO: remove console.log
      FindFriend(friendIdParams, localDataFriends).then((data) => {
        Friend.setUser(data as friend)
        const unSubscribe = onSnapshot(
          doc(db, "conversations", data?.conversation.id as string),
          { includeMetadataChanges: true },
          (doc) => {
            conversation.setConversation({ ...doc.data() as Conversation, id: data?.conversation.id as string })
          });
        return () => unSubscribe()
      })
    }
  }, [friendIdParams])

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      UpdateUserStatus(id, false)
    })
    return () => {
      window.removeEventListener('beforeunload', () => {
        console.log("remove")
      })
    };
  })

  useEffect(() => {
    console.log("start 2") // TODO: remove console.log
    UpdateUserStatus(id, true)
  }, [])

  return (
    <div className="flex md:w-1/1">
      <SideContainer>
        <LeftSideBar UserState={UserState} />
      </SideContainer>
      <main className='w-full'>
        <div className='h-[100vh] overflow-y-scroll'>
          {conversation.state.id ?
            <><MessageHeader UserState={UserState}
              conversation={conversation.state} />
              <MessageBody conversation={conversation.state}
                UserState={UserState} />
              <MessageFooter conversationId={conversation.state.id}
                messageUserId={UserState.state.id} /></>
            : <ResponsiveSmall UserState={UserState} />}
        </div>
      </main>
      {rightSideBar.sideBar && <RightSideBar />}
    </div>
  )
}

export default Home

const ResponsiveSmall = ({ UserState }: { UserState: UserState }) => {

  return <>
    <>
      <div className='md:flex w-full justify-center items-center min-h-screen hidden'>
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
    <div className='md:hidden flex w-full justify-between'>
      <LeftSideBar UserState={UserState} />
    </div>
  </>
}