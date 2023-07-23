import { Conversation } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import uuid4 from "uuid4";
import { CreateMessageData } from "./message";



const CreateConversation = async ({ currentUserId, FriendId }: any) => {
    const d = new Date().toISOString()
    const GIDM = uuid4()
    const data: Conversation = {
        id: uuid4(),
        createDate: d,
        updateDate: d,
        lastMessageDate: d,
        lastMessage: 'new conversation',
        type: "PERSONAL",
        isGroup: false,
        groupName: null,
        groupImage: null,
        groupMembers: [],
        personal: [
            currentUserId,
            FriendId
        ],
        MessageDataId: GIDM
    }
    try {
        setDoc(doc(db, "conversations", data.id), data)
            .then(() => {
                updateDoc(doc(db, "users", currentUserId), {
                    Conversations: arrayUnion(data.id)
                });

                updateDoc(doc(db, "users", FriendId), {
                    Conversations: arrayUnion(data.id)
                });
                return { message: "User add ", code: 200 }
            }).then(() => {
                CreateMessageData(GIDM)
            })

    } catch (error) {
        console.log(error)
        return { message: error, code: 400 }
    }
}

const setLastMessageConversation = async (id: string, message: string) => {
    try {
        const d = new Date().toISOString()
        await updateDoc(doc(db, "conversations", id), {
            lastMessage: message,
            lastMessageDate: d
        });
    } catch (error) {
        console.log("Error getting document:", error);
    }
}

const GetConversationData = async (id: string) => {
    try {
        const docSnap = await getDoc(doc(db, "conversations", id));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}

export {
    CreateConversation,
    GetConversationData,
    setLastMessageConversation
}