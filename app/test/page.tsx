'use client'
import { MessageData } from '@/interfaces/Message'
import { db } from '@/services/firebase/config'
import { data } from 'autoprefixer'
import { setDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { ref, set } from "firebase/database";

const Page = () => {
    const t = async () => {
        await setDoc(doc(db, "List", "ConversationId"), {
            id: "asjio",
            date: new Date().toString(),
            User:[{date:"assd"},{date:"assd"},{date:"olivia"}]
        })
    }
    useEffect(() => {
        const unSubscribe = onSnapshot(
            doc(db, "List", "ConversationId"),
            { includeMetadataChanges: true },
            (doc) => {
                // setMessageData(doc.data() as MessageData)
                console.log(doc.data())
            });
        return () => unSubscribe()
    }, [])
    return (
        <div onClick={t}>
            run
        </div>
    )
}

export default Page