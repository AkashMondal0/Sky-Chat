import React from 'react'
import MessageCard from '../Card/MessageCard'
import { MessageFooter } from './MessageFooter'

const MessageBody = () => {
  return (
    <div>
      <div className='h-[85vh] overflow-y-scroll'>
        <MessageCard />
        <p className='w-full text-center font-medium text-sm'>Fri 22:48</p>
        <MessageCard />
      </div>
      {/* footer */}
      <MessageFooter label={'Message....'} id={'inputChat'} />
    </div>
  )
}

export default MessageBody