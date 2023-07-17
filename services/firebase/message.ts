import { Message } from "@/interfaces/Message";
import { updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const CreateMessage = async (message: Message) => {
    // console.log(message)  // be careful with this conversation id
    try {
        await updateDoc(doc(db, "conversations", message.conversationId), {
            messages: arrayUnion({
                id: message.id,
                message: message.message,
                img: message.img,
                reply: message.reply,
                seenIds: message.seenIds,
                createdAt: new Date(),
                updateAt: new Date(),
                conversationId: message.conversationId,
                messageUserId: message.messageUserId,
            })
        });
    } catch (error) {
        console.log(error)
    }
}

const UpdateMessage = async (message: Message) => { }

const DeleteMessage = async (message: Message) => { }

export {
    CreateMessage,
}