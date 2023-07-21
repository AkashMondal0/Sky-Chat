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
import { GetUserData } from '@/services/firebase/UserDoc';
import { User, initialUser } from '@/interfaces/User';
import useUser from '@/hooks/states/useUser';
import useFriend from '@/hooks/states/useFriend';
interface ConversationCardProps {
    conversation: Conversation
}

const ConversationCard: React.FC<ConversationCardProps> = ({
    conversation: Conversation
}) => {
    const router = useRouter()
    const currentConversation = useConversation()
    const UserState = useUser()
    const [conversation, setConversation] = useState<Conversation>(initialConversation)
    const [user, setUser] = useState<User>(initialUser)

    useEffect(() => {
        console.log("conversation") //TODO: remove console.log
        const friendId = UserState.state.id === Conversation.personal.sender.id ? Conversation.personal.receiver.id : Conversation.personal.sender.id
        const unSubscribeConversation = onSnapshot(
            doc(db, "conversations", Conversation.id), // conversation id
            { includeMetadataChanges: true },
            (doc) => {
                setConversation(doc.data() as Conversation)
                // if (!currentConversation.state.find((i) => i.id === doc.data()?.id)) {
                //     currentConversation.setConversation(doc.data() as Conversation)
                // }
                // // console.log("conversation", data) // TODO: remove console.log
            })
        console.log("conversation User") // TODO: remove console.log
        const unSubscribeUser = onSnapshot(
            doc(db, "users", friendId), // friend id
            { includeMetadataChanges: true },
            (doc) => {
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
                    <Avatar color='green' withBorder={user?.activeUser}
                        variant="circular" alt="candice" src={user?.image} />
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