/* eslint-disable @next/next/no-img-element */
"use client";
import { Avatar } from '@/app/Material'
import { Messages } from '@/interfaces/Message'
import React, { useState } from 'react'
import { GoReply } from 'react-icons/go'
import { TbDots } from 'react-icons/tb'
import { CiFaceSmile } from 'react-icons/ci'
import useReplyMessage from '@/hooks/useReply';
import { timeFormat } from '@/functions/dateTimeFormat';


interface MessageCardProps {
  Message: Messages
  isSender: boolean
  ProfileImageUrl: string
  setSelectedMessage: (value: string) => void
  selectedMessage: string
}

const MessageCard: React.FC<MessageCardProps> = ({
  Message,
  isSender,
  ProfileImageUrl,
  setSelectedMessage,
  selectedMessage
}) => {
  const { id, message, img, messageUserId, reply, date } = Message
  const [isHover, setIsHover] = useState("")
  const replyState = useReplyMessage()

  const replyHandle = () => {
    replyState.setReply({
      message: message,
      img: img,
      authorId: messageUserId,
      video: "",
      messageId: id,
      id: ""
    })
  }

  return (
    <div
      // className={`${selectedMessage===id && "bg-gray-100 rounded-2xl"}`}
      onClick={() => setSelectedMessage(id)}
      onMouseOut={() => setIsHover("")}
      onMouseOver={() => {
        setIsHover(id)
      }}>
      <div className={`w-full flex items-center ${isSender ? "justify-end" : "justify-start"} my-2`}>

        {/* hover */}
        {isHover === id && isSender && <div className='flex gap-2 mx-2'>
          <TbDots size={20} />
          <GoReply className='text-black cursor-pointer' size={20} onClick={replyHandle} />
          <CiFaceSmile size={20} />
        </div>}

        {/* profile image */}
        {!isSender &&
          <img className='w-10 h-10 rounded-full object-cover mr-1'
            alt="not found"
            src={ProfileImageUrl || "/images/user.png"} />}

        <div>
          <div className='reply'>

            {/* reply message */}
            {reply.message && <>
              <div className={`p-1 px-4
       break-words
       flex rounded-2xl  
       max-w-[70vw]
       bg-gray-200 text-black
       md:max-w-[30vw] my-[2px]`}>
                {reply.message}
              </div>
            </>}

            {/* reply image */}
            {reply.img && reply?.img.map((image: string, index: number) =>
              <img key={index} src={image} alt="cascac"
                className='object-cover h-60 w-48 rounded-3xl mb-2 opacity-40' />)}

          </div>

          {/* Message */}
          {message && <div className={`p-1 px-4 
       ${!isSender ? "bg-gray-200 text-black" : `bg-blue-400 text-white`}
       ${img.length > 0 ? "rounded-2xl rounded-br mt-2" : ""}
       break-words
       flex rounded-2xl  
       max-w-[70vw]
       md:max-w-[30vw] my-[2px]`}>
            <div>
              <div className='text-base'>{message}</div>
              <p className='text-xs'>{timeFormat(date)}</p>
            </div>
          </div>}

          {/* image */}
          {img.length > 0 && img.map((image: string, index: number) => {
            return <img key={index} src={image || // TODO: remove this
              "/images/user.png"} alt="" className='object-cover h-60 w-48 rounded-3xl mb-2' />
          })}
        </div>

        {isHover === id && !isSender && <div className='flex gap-2 mx-2'>
          <GoReply className='text-black cursor-pointer' size={20} onClick={replyHandle} />
          <CiFaceSmile size={20} />
        </div>}

      </div>
    </div>
  )
}

export default MessageCard

