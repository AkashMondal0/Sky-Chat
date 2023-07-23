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
import UserCard from './UserCard';
interface ConversationCardProps {
    conversationId: string
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversationId
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    const currentUser = useUser()
    const [conversation, setConversation] = useState<Conversation>(initialConversation)
    const friendId = useRef(null)

    useEffect(() => {
        const unSubscribeConversation = onSnapshot(
            doc(db, "conversations", conversationId), // conversation id
            { includeMetadataChanges: true },
            (doc) => {
                friendId.current = doc.data()?.personal.find((u: string) => u !== currentUser.state.id)
                console.log("conversation") //TODO: remove console.log
                setConversation(doc.data() as Conversation)
            })
        return () => {
            unSubscribeConversation()
        }
    }, [])

    const conversationHandle = (friend: User) => {
        currentConversation.setFriend(friend)
        router.replace(`/?chat=${conversation.id}`)
    }
    return (
        <div>
            <ListItem className='cursor-pointer my-1'>
                {conversation.id && <UserCard 
                conversation={conversation}
                id={friendId.current || "NO-ID"} 
                getUser={conversationHandle} />}
            </ListItem>
        </div>
    )
}

export default ConversationCard