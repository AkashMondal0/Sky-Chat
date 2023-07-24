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
import { Conversation } from '@/interfaces/Conversation';
import { db } from '@/services/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { User, initialUser } from '@/interfaces/User';
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
                console.log("set friend list")
                setUser(doc.data() as User)
                currentConversation.setFriendList(doc.data() as User)
            })
        return () => unSubscribeUser()
    }, [currentConversation, friendId])

    const conversationHandle = () => {
        currentConversation.setFriend(user)
        router.push(`/?chat=${conversation.id}`)
    }
    return (
        <>
            <ListItem className='flex justify-start items-center' onClick={conversationHandle}>
                <ListItemPrefix>
                    <div className="relative flex justify-center items-center border-[2px] rounded-full">
                        <div className={`absolute right-0 bottom-1 w-3 h-3 rounded-full 
                        ${user.activeUser ? "bg-green-500" : " bg-red-500"}`} />

                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={user?.image || "/images/user.png"} />
                    </div>
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