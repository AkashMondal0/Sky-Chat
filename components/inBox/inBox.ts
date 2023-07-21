import { friend } from "@/interfaces/User"

export const FindFriend = async (friendId: string, localDataFriends: friend[]) => {
  if (friendId) {
    const friend = localDataFriends?.find((friend) => friend?.details?.id === friendId)
    return friend
  }else {
    return null
  }
}

export const CompareDates = () =>{
  
}