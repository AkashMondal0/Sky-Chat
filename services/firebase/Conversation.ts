import { Conversation } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import uuid4 from "uuid4";
import { CreateMessageData } from "./message";
import { LastMessage } from "@/interfaces/Message";
import { GetUserData } from "./UserDoc";
import { User } from "@/interfaces/User";



const CreateConversation = async (currentUser: User, FriendData: User) => {
    const d = new Date().toISOString()
    const GIDM = uuid4()

    var data: Conversation = {
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
            currentUser.id,
            FriendData.id
        ],
        MessageDataId: GIDM,
        FriendData: FriendData
    }

    const setFriendConversation = { ...data, FriendData: currentUser }
    try {
        updateDoc(doc(db, "users", currentUser.id), {
            Conversations: arrayUnion(data)
        });

        updateDoc(doc(db, "users", FriendData.id), {
            Conversations: arrayUnion(setFriendConversation)
        })
            .then(() => {
                CreateMessageData(GIDM)
            })
        return true
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