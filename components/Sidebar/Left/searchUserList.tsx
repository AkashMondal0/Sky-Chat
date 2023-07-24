/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
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
import { BtnInstagram } from '@/components/Button/Button'
import { CreateFriendRequest, RemoveFriendRequest } from '@/services/firebase/friendRequest'
import useUser from '@/hooks/states/useUser'
import Card from './Card'

interface SearchUserList {
  onTabChange: (value: steps) => void
}
const SearchUserList: React.FC<SearchUserList> = ({
  onTabChange,
}) => {
  const currentUser = useUser()
  const [users, setUsers] = useState<User[]>([])
  const [input, setInput] = useState<string>('')

  const get = async () => {
    const users = await GetUsers() as User[]
    const UserFilter = users.filter((item) => item.id !== currentUser.state.id)
    setUsers(UserFilter)
    // console.log("users", users)
  }

  useEffect(() => {
    get()
  }, [])

  const handle = async (friend: User) => {
    // setIsFriend(true)
    const FriendRequest: friendRequest = {
      sender: currentUser.state,
      status: false,
      receiver: friend,
      keyValue: 'SENDER',
      id: ''
    }
    CreateFriendRequest(FriendRequest).finally(() => {
      get()
    })
  }

  const handleRemove = async (FriendRequestId: string, friend: User) => {
    await RemoveFriendRequest(FriendRequestId, currentUser.state, friend.id).then(() => {
      get()
    })
  }

  return <>
    <div className='flex items-center gap-2 m-4'>
      <BiArrowBack className='cursor-pointer' size={30} onClick={() => { onTabChange("myUserList") }} />
      <Typography variant="h4">Search</Typography>
    </div>

    {/* search */}
    <div className='p-3'>
      <input className='w-full p-2 border-gray-300
      border-[1px] focus:disabled:outline-none 
      focus:outline-none rounded-xl'
        type="text" placeholder='Search' value={input}
        onChange={(e) => setInput(e.target.value)} />
    </div>


    <div className='p-1'>
      {users.filter((item) => {
        // filter by name
        if (item.name === "") {
          return item;
        } else if (item.name?.toLowerCase().includes(input.toLowerCase())) {
          return item;
        }
      }).map((item, index: number) => {
        const findId = item.FriendRequest.find((i) => i.sender.id === currentUser.state.id || i.receiver.id === currentUser.state.id)
        return <Card key={index}
          profileImg={item.image || "/images/user.png"}
          name={item.name || "No Name"}
          activeUser={item.activeUser}
          email={item.email || "No Email"}
          id={item.id}
          right={
            <div className='flex gap-1'>
              {findId ? <BtnInstagram
                danger
                onClick={() => handleRemove(findId.id, item)}
                label={"Cancel"} /> : <BtnInstagram
                onClick={() => {
                  handle(item)
                }}
                label={"Add"} />}
            </div>
          }
        />
      })}
    </div>
  </ >
}
export default SearchUserList