import React, { useEffect } from 'react'
import MessageHeader from './MessageHeader'
import { useSearchParams } from 'next/navigation'
import MessageBody from './MessageBody'
import SideBar from '../Sidebar'
const Home = () => {
  const SearchParams = useSearchParams().get("chat")

  useEffect(() => {
    console.log("refresh")
  }, [SearchParams])

  return (
    <div className="flex md:w-1/1">
      <SideBar />
      <div className='w-full'>
        <MessageHeader />
        <MessageBody />
      </div>
    </div>
  )
}

export default Home