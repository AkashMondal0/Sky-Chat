import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { User } from "@/interfaces/User";

const CreateUserData = async (data: User) => {

    await setDoc(doc(db, "users", data.id), {
        id: data.id,
        name: data.name,
        email: data.email,
        emailVerified: false,
        image: data.image,
        createdAt: new Date(),
        updateAt: new Date(),
        conversationsIds: [],
        conversation: [],
        seenMessagesIds: [],
        seenMessages: [],
        accounts: [],
        messages: []
    });
}

const GetUserData = async (id: string) => {
    try {
        const docSnap = await getDoc(doc(db, "users", id));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}

export { CreateUserData, GetUserData }