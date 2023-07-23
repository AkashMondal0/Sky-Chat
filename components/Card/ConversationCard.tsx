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
import ConversationUserCard from './conversationUserCard';
interface ConversationCardProps {
    conversationId: string
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversationId
}) => {
    const router = useRouter()
    const [conversation, setConversation] = useState<Conversation>(initialConversation)
    const currentConversation = useConversation()
    const currentUser = useUser()
    const friendId = useRef("")

    useEffect(() => {
        currentUser.state.Conversations?.find((c: Conversation) => {
            if (c.id === conversationId) {
                setConversation(c)
                friendId.current = c.personal.find((u: string) => u !== currentUser.state.id) || ""
            }
        })
    }, [])

    const conversationHandle = (friend:User) => {
        currentConversation.setFriend(friend)
        router.push(`/?chat=${conversation.id}`)
    }
    return (
        <>
                {conversation.id && <ConversationUserCard 
                conversation={conversation}
                id={friendId.current || "NO-ID"} 
                getUser={conversationHandle} />}
           
        </>
    )
}

export default ConversationCard