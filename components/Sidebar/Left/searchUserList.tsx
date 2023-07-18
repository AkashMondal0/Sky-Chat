import React, { useEffect, useState } from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Avatar, List, ListItem, ListItemPrefix, Typography } from '@/app/Material'
import UserCard from '../../Card/userCard'
import { User, UserContextIn } from '@/interfaces/User'
import { ConversationRequest } from '@/interfaces/Conversation'
import { GetUsers } from '@/services/firebase/UserDoc'
import { CreateConversation } from '@/services/firebase/Conversation'

interface SearchUserList {
  onTabChange: (value: steps) => void
  UserState: UserContextIn
}
const SearchUserList: React.FC<SearchUserList> = ({
  onTabChange,
  UserState
}) => {
  const [users, setUsers] = useState<User[]>([])

  const get = async () => {
    const users = await GetUsers() as User[]
    setUsers(users)
  }

  useEffect(() => {
    get()
  }, [])

  const handle = async (id: string) => {
    const data: ConversationRequest = {
      groupImage: null,
      groupName: null,
      isGroup: false,
      lastMessage: "new friend",
      authorId: UserState.state.id,
      userId: id
    }
    CreateConversation(data)
  }

  return <div>
    <div className='p-3 flex items-center gap-5 sticky top-0 z-50 px-4 py-2 bg-white'>
      <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
      <Typography variant="h4">Search</Typography>
    </div>
    <List>
      {users.map((item, index: number) => (
        <div key={index} onClick={() => { handle(item.id) }}>
          <ListItem
            className='cursor-pointer my-1'>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src={"https://assets.mycast.io/actor_images/actor-olivia-sanabia-279726_large.jpg?1633292709"} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name || "Loading..."}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Software Engineer
              </Typography>
            </div>
          </ListItem>
        </div>
      ))}
    </List>
  </div >
}
export default SearchUserList