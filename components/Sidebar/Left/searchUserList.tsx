/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@/app/Material"
import { steps } from '.'
import { BiArrowBack } from 'react-icons/bi'
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
    const UserFilter = users.filter((item) => item.id !== UserState.state.id)
    setUsers(UserFilter)
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
    <div className=''>
      {users.map((item, index: number) => <div key={item.id} className='cursor-pointer flex justify-between items-center mx-1
             px-2 rounded-xl hover:bg-gray-100'>
          <div className='flex justify-between items-center'>
            <ListItemPrefix>
              <img className='w-14 h-14 rounded-full object-cover border-[1px]'
                alt="not found"
                src={item.image || "/images/user.png"} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {item.name || "No Name"}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {item.email || "No Email"}
              </Typography>
            </div>
          </div>
          <div className='flex gap-1'>
            <BtnInstagram
              onClick={() => { handle(item) }}
              label={"Add"} />
          </div>
        </div>)}
    </div>
  </ >
}
export default SearchUserList