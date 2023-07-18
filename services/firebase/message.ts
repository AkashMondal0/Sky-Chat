import { Message } from "@/interfaces/Message";
import { updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "./config";
import { UploadPhoto } from "./uploadFile";

const CreateMessage = async (message: Message) => {
    var imgArray: string[] = []
    try {
        if (message.img.length > 0) {
            for (let i = 0; i < message.img.length; i++) {
                const url = await UploadPhoto(message.img[i], message.messageUserId)
                imgArray.push(url as string)
            }
        }
        await updateDoc(doc(db, "conversations", message.conversationId), {
            messages: arrayUnion({
                id: message.id,
                message: message.message,
                img: imgArray,
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