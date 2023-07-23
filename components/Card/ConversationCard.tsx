/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@/app/Material"
import { useRouter } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation';
import { Conversation, initialConversation } from '@/interfaces/Conversation';
import { db } from '@/services/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { User, initialUser } from '@/interfaces/User';
import useUser from '@/hooks/states/useUser';
import uuid4 from 'uuid4';
interface ConversationCardProps {
    conversation: Conversation
    friendId: string
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversation,
    friendId
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    const [user, setUser] = useState<User>(initialUser)


    useEffect(() => {
        const unSubscribeUser = onSnapshot(
            doc(db, "users", friendId), // friend id
            { includeMetadataChanges: true },
            (doc) => {
                setUser(doc.data() as User)
            })
        return () => unSubscribeUser()
    }, [friendId])

    const conversationHandle = () => {
        currentConversation.setFriend(user)
        router.push(`/?chat=${conversation.id}`)
    }
    return (
        <>
            <ListItem className='flex justify-start items-center' onClick={conversationHandle}>
                <ListItemPrefix>
                    {user?.image ? <div className="relative flex justify-center items-center border-[2px] rounded-full">
                        <div className={`absolute right-0 bottom-1 w-3 h-3 rounded-full 
                        ${user.activeUser ? "bg-green-500" : " bg-red-500"}`} />

                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={user?.image || "/images/user.png"} />
                    </div> :
                        <div className="relative flex w-64 animate-pulse gap-2 p-4">
                            <div className="h-12 w-12 rounded-full bg-slate-400" />
                            <div className="flex-1">
                                <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg" />
                                <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm" />
                            </div>
                            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400" />
                        </div>}

                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {user?.name || "User"}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {conversation?.lastMessage || ""}
                    </Typography>
                </div>
            </ListItem>

        </>
    )
}

export default ConversationCard