import { collection, doc, getDoc, getDocs, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { User } from "@/interfaces/User";

const CreateUserData = async (data: User) => {
    try {
        await setDoc(doc(db, "users", data.id), {
            id: data.id,
            name: data.name,
            email: data.email,
            emailVerified: false,
            image: data.image,
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
            Contacts: [],
            activeUser: true,
            lastTimeOnline: serverTimestamp()
        })
    } catch (error) {
        console.log(error)
    }
}

const UpdateUserStatus = async (UserId: string, activeUser: boolean) => {
    // console.log(UserId, activeUser)
    try {
        await updateDoc(doc(db, "users", UserId), {
            activeUser: activeUser,
            lastTimeOnline: serverTimestamp()
        });
    } catch (error) {
        console.log(error)
    }
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

const GetUsers = async () => {
    try {
        const docSnap = await getDocs(collection(db, "users"));
        return docSnap.docs.map(doc => doc.data());
    } catch (error) {
        console.log("Error getting document:", error);
        return null
    }
}

export {
    CreateUserData,
    GetUserData,
    GetUsers,
    UpdateUserStatus
}