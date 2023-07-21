import { Conversation } from "@/interfaces/Conversation";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "./config";
import uuid4 from "uuid4";



const CreateConversation = async (data: Conversation) => {

    try {

        setDoc(doc(db, "conversations", data.id), data)
            .then(() => {
                updateDoc(doc(db, "users", data.personal.sender.id), {
                    Conversations: arrayUnion(data)
                });

                updateDoc(doc(db, "users", data.personal.receiver.id), {
                    Conversations: arrayUnion(data)
                });
                return { message: "User add ", code: 200 }
            })

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