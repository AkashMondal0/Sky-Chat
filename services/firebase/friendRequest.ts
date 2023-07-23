import { User, friendRequest } from "@/interfaces/User"
import { GetUserData } from "./UserDoc"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "./config"
import uuid4 from "uuid4"

const CreateFriendRequest = async (data: friendRequest) => {
    const GID = uuid4()
    try {
        const UserData = await GetUserData(data.sender.id) as User // send it me
        const findMyIdInFriendSenderList = UserData.FriendRequest.find((User) => User?.sender.id === data.receiver.id)
        if (!findMyIdInFriendSenderList) {
            await updateDoc(doc(db, "users", data.receiver.id), {
                FriendRequest: arrayUnion({
                    receiver: data.sender,
                    keyValue: "RECEIVER",
                    sender: data.receiver,
                    id: GID,
                    createDate: new Date().toISOString(),
                    status: false,
                })
            });
            //  user set friend request
            await updateDoc(doc(db, "users", data.sender.id), {
                FriendRequest: arrayUnion({
                    receiver: data.receiver,
                    keyValue: "SENDER",
                    sender: data.sender,
                    id: GID,
                    createDate: new Date().toISOString(),
                    status: false,
                })
            });
        }
    } catch (error) {
        console.log(error)
    }
}

const RemoveFriendRequest = async (friendRequestId: string, currentUserId: User, friendId: string) => {

    try {
        await updateDoc(doc(db, "users", currentUserId.id), {
            FriendRequest: currentUserId.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
        const FriendData = await GetUserData(friendId) as User
        await updateDoc(doc(db, "users", friendId), {
            FriendRequest: FriendData.FriendRequest.filter((FR) => FR?.id !== friendRequestId)
        });
    } catch (error) {
        console.log(error)
    }
}


export {
    RemoveFriendRequest,
    CreateFriendRequest
}
