import uuid from 'uuid-random';
import { ConversationRequest } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, serverTimestamp, arrayUnion, setDoc } from "firebase/firestore";
import { GetUserData } from "./UserDoc";
import { db } from "./config";
import { User } from "@/interfaces/User";


const CreateConversation = async (data: ConversationRequest) => {
    const newID = uuid()
    try {
        const userFind = await GetUserData(data.authorId) as User
        const friend = userFind.Contacts.find((item) => item.friend === data.userId)

        if (!friend) {
            setDoc(doc(db, "conversations", newID), {
                id: newID,
                createdAt: serverTimestamp(),
                updateAt: serverTimestamp(),
                lastMessageAt: serverTimestamp(),
                lastMessage: data.lastMessage,
                groupName: data.groupName,
                groupImage: data.groupImage,
                isGroup: data.isGroup,
                messages: [],
                userIds: [data.authorId, data.userId],
            }).then(() => {
                updateDoc(doc(db, "users", data.authorId), {
                    Contacts: arrayUnion({
                        friend: data.userId,
                        conversation: newID
                    })
                });

                updateDoc(doc(db, "users", data.userId), {
                    Contacts: arrayUnion({
                        friend: data.authorId,
                        conversation: newID
                    })
                });
                return { message: "User add ", code: 200 }
            })
        } else {
            console.log("User Already In Your Chat")
            return { message: "User Already In Your Chat", code: 400 }
        }
    } catch (error) {
        console.log(error)
        return { message: error, code: 400 }
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
}