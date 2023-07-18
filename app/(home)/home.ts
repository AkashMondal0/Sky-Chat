import { Conversation } from "@/interfaces/Conversation"
import { User, friend } from "@/interfaces/User"
import { GetConversationData } from "@/services/firebase/Conversation"
import { GetUserData, UpdateUserStatus } from "@/services/firebase/UserDoc"

const setData = async (data: User) => {
    const { Contacts, ...rest } = data
    var friendsArray: friend[] = []

    for (let i = 0; i < Contacts.length; i++) {
        const friends: friend = {
            friend: await GetUserData(Contacts[i].friend) as User,
            lastMessage: Contacts[i].lastMessage || "",
            lastMessageTime: Contacts[i].lastMessageTime,
            conversation: await GetConversationData(Contacts[i].conversation) as Conversation,
            conversationID: Contacts[i].conversation
        }
        friendsArray.push(friends)
    }
    return friendsArray
}

export { setData } 