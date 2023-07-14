import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/services/firebase/config";
import { UserCredential, UserLogin } from "@/interfaces/User";


const LoginFireBase = async (Data: UserCredential) => {
    try {
        var user = (await signInWithEmailAndPassword(firebaseAuth, Data.email, Data.password)).user
        const loginData = {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.photoURL,
            id: user.uid
        }
        localStorage.setItem('sky.Auth', JSON.stringify(loginData.id));
        return loginData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const RegisterFireBase = async (Data: UserCredential) => {
    try {
        var user = (await createUserWithEmailAndPassword(firebaseAuth, Data.email, Data.password)).user
        const loginData = {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.photoURL,
            id: user.uid
        }
        return loginData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { LoginFireBase, RegisterFireBase }