"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import MessageHeader from './MessageHeader'
import { useSearchParams, usePathname } from 'next/navigation'
import MessageBody from './MessageBody'
import LeftSideBar from '../Sidebar/Left'
import { Conversation } from '@/interfaces/Conversation'
import { MessageFooter } from './MessageFooter'
import { LiaFacebookMessenger } from 'react-icons/lia'
import RightSideBar from '../Sidebar/Right'
import useRightSideBar from '@/hooks/useRightSideBar'
import { UpdateUserStatus } from '@/services/firebase/UserDoc'
import useConversation from '@/hooks/states/useConversation'
import useUser from '@/hooks/states/useUser'
import SideContainer from '../Sidebar/SideContainer';


const Home = () => {
  const conversationID = useSearchParams().get("chat") as string
  const currentUser = useUser()
  const currentConversation = useConversation()
  const rightSideBar = useRightSideBar()// current user id
  const asPath = usePathname()


  useEffect(() => {
    if (conversationID) {
      currentUser.state.Conversations?.find((c: Conversation) => {
        if (c.id === conversationID) {
          currentConversation.setConversationData(c)
          console.log("start 1") // TODO: remove console.log
        }
      })
    }
  }, [conversationID])

  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      if (currentUser.state?.id) {
        UpdateUserStatus(currentUser.state.id, false)
      }
    })
    return () => {
      window.removeEventListener('beforeunload', () => {
        console.log("remove")
      })
    };
  })

  useEffect(() => {
    console.log("start 2") // TODO: remove console.log
    if (currentUser.state?.id) {
      UpdateUserStatus(currentUser.state.id, true)
    }
  }, [])
  // console.log(UserState.state)

  return (
    <div className="flex md:w-full max-h-[100vh]">
      <SideContainer>
        <LeftSideBar />
      </SideContainer>
      <>
        {currentConversation.conversationData.id || asPath !== "/" ?
          <div className='w-full overflow-y-scroll'>
            <div className='md:sticky w-full fixed top-0'>
              <MessageHeader conversation={currentConversation.conversationData} UserState={currentUser} />
            </div>
            <MessageBody conversation={currentConversation.conversationData} UserState={currentUser} />
            <div className='md:sticky w-full fixed bottom-0'>
              <MessageFooter conversation={currentConversation.conversationData} messageUserId={currentUser.state?.id} />
            </div>
          </div>
          :
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
            <div className='md:hidden flex w-full justify-between'>
              <LeftSideBar />
            </div>
          </>
        } </>




      {rightSideBar.sideBar && <RightSideBar />}
    </div>
  )
}

export default Home
