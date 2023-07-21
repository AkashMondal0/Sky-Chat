import React, { useEffect, useState } from 'react'
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
import { Avatar, List, ListItem, ListItemPrefix, Typography } from '@/app/Material'
import { User, UserState, friendRequest } from '@/interfaces/User'
import { GetUsers } from '@/services/firebase/UserDoc'
import UserCard from '@/components/Card/UserCard'
import { BtnInstagram } from '@/components/Button/Button'
import { CreateFriendRequest } from '@/services/firebase/friendRequest'

interface SearchUserList {
  onTabChange: (value: steps) => void
  UserState: UserState
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

  const handle = async (friend: User) => {
    const FriendRequest: friendRequest = {
      sender: UserState.state,
      status: false,
      receiver: friend,
      keyValue: 'SENDER',
      id: ''
    }
    CreateFriendRequest(FriendRequest)
  }
  return <>
    <div className='flex items-center gap-2 m-4'>
      <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
      <Typography variant="h4">Search</Typography>
    </div>
    <List>
      {users.map((item, index: number) => <UserCard
        key={index}
        profileImg={item.image} name={item.name}
        activeUser={false}
        email={item.email}
        id={item.id}
        right={
          <>
            <BtnInstagram
              onClick={() => { handle(item) }}
              label={"Add"} />
          </>
        }
      />)}
    </List>
  </ >
}
export default SearchUserList