import { Conversation } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import uuid4 from "uuid4";
import { CreateMessageData } from "./message";
import { LastMessage } from "@/interfaces/Message";
import { GetUserData } from "./UserDoc";
import { User } from "@/interfaces/User";



const CreateConversation = async ({ currentUserId, FriendId }: any) => {
    
    // console.log(currentUserId, FriendId)
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
                    Conversations: arrayUnion(data)
                });

                updateDoc(doc(db, "users", FriendId), {
                    Conversations: arrayUnion(data)
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

const setLastMessageConversation = async (data: LastMessage) => {
    const d = new Date().toString()
    const {
        lastMessage,
        UserId,
        friendId,
        conversationId,
    } = data
    try {
        const getUser = await GetUserData(UserId) as User
        const getFriend = await GetUserData(friendId) as User

        const conUserUpdate = getUser.Conversations.map((item: Conversation) => {
            if (item.id === conversationId) {
                return {
                    ...item,
                    lastMessage,
                    lastMessageDate: d
                }
            }
            return item
        })

        const conUpdateFriend = getFriend.Conversations.map((item: Conversation) => {
            if (item.id === conversationId) {
                return {
                    ...item,
                    lastMessage,
                    lastMessageDate: d
                }
            }
            return item
        })
        // only update last message
        await setDoc(doc(db, "users", UserId), {
            ...getUser,
            Conversations: conUserUpdate
        });
        await setDoc(doc(db, "users", friendId), {
            ...getFriend,
            Conversations: conUpdateFriend
        })

        return { ...getUser, Conversations: conUserUpdate }
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