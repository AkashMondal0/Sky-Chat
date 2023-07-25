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
import { useRouter, useSearchParams } from 'next/navigation'
import useConversation from '@/hooks/states/useConversation';
import { Conversation } from '@/interfaces/Conversation';
import { db } from '@/services/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { User, initialUser } from '@/interfaces/User';
interface ConversationCardProps {
    conversationData: Conversation
    friendId: string
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversationData,
    friendId
}) => {
    const router = useRouter()
    const ParamsConversationId = useSearchParams().get("chat") as string
    const currentConversation = useConversation()
    const [user, setUser] = useState<User>(initialUser)


    useEffect(() => {
        const unSubscribeUser = onSnapshot(
            doc(db, "users", friendId), // friend id
            { includeMetadataChanges: true },
            (doc) => {
                console.log("set friend list")
                const friend = doc.data() as User
                setUser(friend)
                friend.Conversations.find((friendConversation) => friendConversation.id === ParamsConversationId)
                currentConversation.setFriend(friend)
            })
        return () => unSubscribeUser()
    }, [])

    const conversationHandle = () => {
        currentConversation.setFriend(user)
        router.push(`/?chat=${conversationData.id}`)
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
                        {conversationData?.lastMessage || ""}
                    </Typography>
                </div>
            </ListItem>

        </>
    )
}

export default ConversationCard