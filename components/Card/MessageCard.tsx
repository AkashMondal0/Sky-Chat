/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar } from '@/app/Material'
import { Message } from '@/interfaces/Message'
import React from 'react'

interface MessageCardProps {
  Message: Message
  isSender: boolean
  ProfileImageUrl: string
}

const MessageCard: React.FC<MessageCardProps> = ({
  Message,
  isSender,
  ProfileImageUrl
}) => {
  const { id, message, img, } = Message

  return (
    <>
      <div className={`w-full flex ${isSender ? "justify-end" : "justify-start"} my-2`}>
        {!isSender && <Avatar className='mr-1' variant="circular" alt="candice" size='sm' src={ProfileImageUrl || "https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709"} />}
        <div>
          {message && <div className={`p-1 px-4 
       ${!isSender ? "bg-gray-200 text-black" : "bg-blue-400 text-white"}
       ${img.length > 0 ? "rounded-2xl rounded-br mt-2" : ""}
       break-words
       flex rounded-2xl  
       max-w-[70vw]
       md:max-w-[30vw] my-[2px]`}>
            {message}
          </div>
          }
          {img.length > 0 && img.map((image: string, index: number) => {
            return <img key={index} src={image} alt="" className='object-cover h-60 w-48 rounded-3xl mb-2' />
          })}
        </div>
      </div>
      {/* {isSender && <Avatar variant="circular" alt="candice" size='sm' src={ProfileImageUrl || "https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709"} />} */}
    </>
  )
}

export default MessageCard

