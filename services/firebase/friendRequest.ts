import { User, friendRequest } from "@/interfaces/User"
import { GetUserData } from "./UserDoc"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "./config"
import uuid4 from "uuid4"

const CreateFriendRequest = async (data: friendRequest) => {
    const GID = uuid4()
    const d = new Date().toISOString()
    const newFriendRequest: friendRequest = {
        receiverId: data.receiverId,
        senderId: data.senderId,
        id: GID,
        status: false,
        keyValue: "SENDER",
        UsersIds: data.UsersIds,
        createDate: d
    }
    const Receiver = { ...newFriendRequest, keyValue: "RECEIVER" }
    try {
        const UserData = await GetUserData(newFriendRequest.receiverId) as User // send it me
        const findMyIdInFriendSenderList = UserData.FriendRequest.find((User) => User?.UsersIds.includes(newFriendRequest.receiverId))
        if (!findMyIdInFriendSenderList) {
            //  receiver set friend request
            await updateDoc(doc(db, "users", newFriendRequest.receiverId), {
                FriendRequest: arrayUnion(Receiver)
            });
            //  user set friend request
            await updateDoc(doc(db, "users", newFriendRequest.senderId), {
                FriendRequest: arrayUnion(newFriendRequest)
            });
        }
        return true
    } catch (error) {
        console.log(error)
    }
}

const RemoveFriendRequest = async (friendRequestId: string, currentUserId: string, friendId: string) => {
    try {
        const currentUserData = await GetUserData(currentUserId) as User
        await updateDoc(doc(db, "users", currentUserId), {
            FriendRequest: currentUserData.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
        const FriendData = await GetUserData(friendId) as User
        await updateDoc(doc(db, "users", friendId), {
            FriendRequest: FriendData.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
        return true
    } catch (error) {
        console.log(error)
    }
}


export {
    RemoveFriendRequest,
    CreateFriendRequest
}
