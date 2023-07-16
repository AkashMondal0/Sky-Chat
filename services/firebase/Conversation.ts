import { ConversationRequest } from "@/interfaces/Conversation";
import { collection, doc, getDoc, updateDoc, serverTimestamp, addDoc, arrayUnion } from "firebase/firestore";
import { GetUserData } from "./UserDoc";
import { db } from "./config";
import { User } from "@/interfaces/User";


const CreateConversation = async (data: ConversationRequest) => {
    try {
        const userFind = await GetUserData(data.authorId) as User
        const friend = userFind.Contacts.find((item) => item.friend === data.userId)

        if (!friend) {
            const CreateData = await addDoc(collection(db, "conversations"), {
                createdAt: serverTimestamp(),
                updateAt: serverTimestamp(),
                lastMessageAt: serverTimestamp(),
                lastMessage: data.lastMessage,
                groupName: data.groupName,
                groupImage: data.groupImage,
                isGroup: data.isGroup,
                messages: [],
                userIds: [data.authorId, data.userId],
            });

            await updateDoc(doc(db, "users", data.authorId), {
                Contacts: arrayUnion({
                    friend: data.userId,
                    conversation: CreateData.id
                })
            });

            await updateDoc(doc(db, "users", data.userId), {
                Contacts: arrayUnion({
                    friend: data.authorId,
                    conversation: CreateData.id
                })
            });
            return { message: "User add ", code: 200 }
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