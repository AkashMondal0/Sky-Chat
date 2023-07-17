import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/config";
import { User, UserCredential } from "@/interfaces/User";
import { CreateUserData } from "./UserDoc";
import { SetToken } from "@/functions/localData";
import { initialUser } from "@/context/User/UserReducer";


const LoginFireBase = async (Data: UserCredential) => {
    try {
        var user = (await signInWithEmailAndPassword(firebaseAuth, Data.email, Data.password)).user
        const loginData = {
            ...initialUser,
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.photoURL,
            id: user.uid,
        } as User
        SetToken(loginData.id)
        return loginData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const RegisterFireBase = async (Data: UserCredential) => {
    try {
        var user = (await createUserWithEmailAndPassword(firebaseAuth, Data.email, Data.password)).user
        await updateProfile(user, { displayName: Data.name })
        const loginData = {
            ...initialUser,
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.photoURL,
            id: user.uid,
        } as User
        CreateUserData(loginData)
        SetToken(loginData.id)
        return loginData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { LoginFireBase, RegisterFireBase }