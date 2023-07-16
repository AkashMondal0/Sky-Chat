/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsMic } from 'react-icons/bs';
import { Message } from '@/interfaces/Message';
import uuid from 'uuid-random'
import { CreateMessage } from '@/services/firebase/message';
interface InputProps {
    conversationId: string
    messageUserId: string
}

export const MessageFooter: React.FC<InputProps> = ({
    conversationId,
    messageUserId
}) => {
    const [input, setInput] = useState<Message>({
        id: uuid(),
        message: '',
        img: [],
        reply: false,
        seenIds: [],
        messageUserId: messageUserId,
        createdAt: undefined,
        updateAt: undefined,
        conversationId: conversationId
    })
    const handleSend = async () => {
        await CreateMessage({ ...input, conversationId: conversationId })
    }
    return (
        <React.Fragment>
            <div className='fixed bottom-0 bg-white width-available p-3 pt-1 '>
                <div className='rounded-3xl border-[1px]'>

                    {/* todo */}
                    <div className='w-full'>
                        {/* {input.img.map((item: any, index: any) => <img
                            key={index}
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(item)}
                        />)} */}
                    </div>

                    <div className='flex items-center px-4'>
                        {/* left side items */}
                        <GrEmoji size={30} className='mr-2' />
                        {/* center item */}
                        <input
                            onChange={(e) => { setInput({ ...input, message: e.target.value }) }}
                            id={'Message'}
                            type={"text"}
                            value={input.message}
                            autoComplete={'off'}
                            placeholder='Message...'
                            className='w-full border-gray-300 rounded-full outline-none focus:none p-2 ' />

                        {/* right side items */}

                        {input.message?.length > 0 ? <button
                            className='font-semibold text-blue-500 hover:text-black cursor-pointer'
                            onClick={handleSend}>Send</button> :
                            <div className='flex gap-3'>
                                <BsMic size={25} />
                                <label htmlFor='myImage'
                                    className='cursor-pointer'>
                                    <HiOutlinePhotograph size={25} />
                                </label>
                                <AiOutlineHeart size={25} />
                            </div>}
                    </div>
                </div>
            </div>

            <input
                multiple
                className='hidden'
                type="file"
                name="myImage"
                id="myImage"
                onChange={(event) => {
                    setInput({ ...input, img: event.target.files })
                }}
            />
        </React.Fragment>
    )
}
