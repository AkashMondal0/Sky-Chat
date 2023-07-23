/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { useRouter, useSearchParams } from 'next/navigation'
import { BtnInstagram } from '../Button/Button';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { User, initialUser } from '@/interfaces/User';
import { Conversation } from '@/interfaces/Conversation';
import useConversation from '@/hooks/states/useConversation';

interface UserCardProps {
    id: string
    right?: React.ReactNode
    getUser: (user: User) => void
    conversation: Conversation
}

const ConversationUserCard: React.FC<UserCardProps> = ({
    id,
    right,
    getUser,
    conversation
}) => {
    const router = useRouter()
    const [user, setUser] = useState<User>(initialUser)
    const conversationID = useSearchParams().get("chat") as string
    const currentConversation = useConversation()


    useEffect(() => {
        if (id !== "NO-ID") {
            const unSubscribeUser = onSnapshot(
                doc(db, "users", id), // friend id
                { includeMetadataChanges: true },
                (doc) => {
                    const friend = doc.data() as User
                    if (currentConversation.conversationData.personal.find((i) => i === friend.id)) {
                        currentConversation.setFriend(friend)
                    }
                    console.log("conversation User") // TODO: remove console.log
                    setUser(friend)
                    // console.log("user", data) // TODO: remove console.log
                })
            return () => unSubscribeUser()
        }
    }, [])

    return (
        <ListItem className='flex justify-start items-center' onClick={() => {
            getUser(user)
        }}>
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
                    {user?.name || ""}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    {conversation?.lastMessage || ""}
                </Typography>
            </div>
        </ListItem>
    )
}

export default ConversationUserCard