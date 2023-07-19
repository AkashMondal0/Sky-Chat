/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { GrEmoji } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsMic } from 'react-icons/bs';
import { Message, initialMessage, initialReply } from '@/interfaces/Message';
import uuid from 'uuid-random'
import { CreateMessage } from '@/services/firebase/message';
import { RxCrossCircled } from 'react-icons/rx';
import useReplyMessage, { UserReply } from '@/hooks/useReply';

interface InputProps {
    conversationId: string
    messageUserId: string
}

export const MessageFooter: React.FC<InputProps> = ({
    conversationId,
    messageUserId
}) => {
    const replyState = useReplyMessage()
    const [input, setInput] = useState<Message>({
        id: uuid(), // message id
        message: '',
        img: [],
        reply: false,
        seenIds: [],
        messageUserId: messageUserId, // user id
        createdAt: undefined,
        updateAt: undefined,
        conversationId: conversationId // conversation id
    })
    const handleSend = async () => {
        CreateMessage({ ...input, conversationId: conversationId, reply: replyState.state })
        setInput({ ...initialMessage, messageUserId: messageUserId, id: uuid() })
        replyState.setReply(initialReply)
    }

    const onChangeFilePicker = (event: any) => {
        var fileArray = []
        const files = event.target.files.length
        for (let i = 0; i < files; i++) {
            const img = event.target.files[i]
            img['id'] = uuid()
            fileArray.push(event.target.files[i])
        }
        const stateImages = [...input.img, ...fileArray]
        setInput({ ...input, img: stateImages })
    }

    const handleDeleteImage = (id: string) => {
        const newImage = input.img.filter((item: any) => item.id !== id)
        setInput({ ...input, img: newImage })
    }
    return (
        <React.Fragment>
            <div className='fixed bottom-0 bg-white width-available p-3 pt-1 '>
                <div className='rounded-3xl border-[1px]'>
                    {/* Action Show */}
                    <div className='w-full flex gap-3 m-1 mt-0 items-center'>
                        {/* file */}
                        {input.img.map((item: any, index: any) =>
                            <div key={index}>
                                <div onClick={() => { handleDeleteImage(item.id) }}
                                    className='flex justify-end cursor-pointer'>
                                    <RxCrossCircled size={20} />
                                </div>
                                <img className='w-16 h-16 rounded-2xl object-cover'
                                    alt="not found"
                                    src={URL.createObjectURL(item)} />
                            </div>)}
                        {/* reply message */}
                        {replyState.state.messageId &&
                            <div className='flex m-3 justify-between w-full'>
                                <div>
                                    <p>{replyState.state?.authorId === messageUserId ? "Replying to yourself" : "Replying"}</p>
                                    {replyState.state?.message && <div>{replyState.state?.message}</div>}
                                    {replyState.state?.img &&
                                        replyState.state?.img.map((i) => <img key={i}
                                            className='w-16 h-16 rounded-2xl object-cover' alt="not found"
                                            src={i} />)}
                                </div>
                                <div onClick={() => { replyState.setReply(initialReply) }}
                                    className='flex justify-end cursor-pointer'>
                                    <RxCrossCircled size={25} />
                                </div>
                            </div>
                        }
                        {/*  ////////////*/}
                        {input.img.length > 0 && <label htmlFor='myImage'
                            className='cursor-pointer w-16
                             h-16 bg-gray-100 rounded-2xl
                             flex justify-center items-center'>
                            <HiOutlinePhotograph size={40} />
                        </label>}
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

                        {input.message?.length > 0 || input.img?.length > 0 ? <button
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
                    onChangeFilePicker(event)
                }}
            />
        </React.Fragment>
    )
}
