/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react'
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
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversation: Conversation
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    const currentUser = useUser()
    const [conversation, setConversation] = useState<Conversation>(initialConversation)
    const [user, setUser] = useState<User>(initialUser)

    useEffect(() => {
        const friendId = currentUser.state.id === Conversation.personal.sender.id ? Conversation.personal.receiver.id : Conversation.personal.sender.id
        const unSubscribeConversation = onSnapshot(
            doc(db, "conversations", Conversation.id), // conversation id
            { includeMetadataChanges: true },
            (doc) => {
                console.log("conversation") //TODO: remove console.log
                setConversation(doc.data() as Conversation)
                // currentConversation.setRef(uuid4())
                // 
            })
        const unSubscribeUser = onSnapshot(
            doc(db, "users", friendId), // friend id
            { includeMetadataChanges: true },
            (doc) => {
                console.log("conversation User") // TODO: remove console.log
                setUser(doc.data() as User)
                // console.log("user", data) // TODO: remove console.log
            })
        return () => {
            unSubscribeConversation()
            unSubscribeUser()
        }
    }, [])

    // console.log(currentConversation.state)// TODO: remove console.log

    return (
        <div onClick={() => {
            currentConversation.setFriendConversation(user, conversation.id)
            router.replace(`/?chat=${conversation.id}`) // TODO push to change clicked function or method
        }}>
            <ListItem
                className='cursor-pointer my-1'>
                <ListItemPrefix>
                    <div className="mr-3 relative flex justify-center items-center border-[2px] rounded-full">
                        <div className={`absolute right-0 bottom-1 w-3 h-3 rounded-full 
                        ${user.activeUser ? "bg-green-500" : " bg-red-500"}`} />

                        <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                            alt="not found"
                            src={user?.image || "/images/user.png"} />
                    </div>

                </ListItemPrefix>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        {user?.name || "Loading..."}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {conversation?.lastMessage || "Loading..."}
                    </Typography>
                </div>
            </ListItem>
        </div>
    )
}

export default ConversationCard