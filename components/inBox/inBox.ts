import { friend } from "@/interfaces/User"

export const FindFriend = async (friendId: string, localDataFriends: friend[]) => {
  if (friendId) {
    const friend = localDataFriends?.find((friend) => friend?.friend?.id === friendId)
    return friend
  }else {
    return null
  }
}