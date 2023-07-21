import React, { useEffect } from 'react'
import MyUserList from './myUserList'
import SearchUserList from './searchUserList'
import { UserState } from '@/interfaces/User'
import RequestUserList from './requestUserList'
import Notification from './notification'
export type steps = "myUserList" | "requestUserList" | "searchUserList" | "notification"

interface LeftSideBar {
  UserState: UserState
}

const LeftSideBar: React.FC<LeftSideBar> = ({
  UserState
}) => {
  const [steps, setSteps] = React.useState<steps>("myUserList")
  const onTabChange = (value: steps) => {
    setSteps(value)
  }

  return (
    <div className='w-full'>
      <div className={`${steps !== "myUserList" && "hidden"}`}>
        <MyUserList onTabChange={onTabChange} UserState={UserState} />
      </div>
      <div className={`${steps !== "searchUserList" && "hidden"}`}>
        <SearchUserList onTabChange={onTabChange} UserState={UserState} />
      </div>
      <div className={`${steps !== "requestUserList" && "hidden"}`}>
        <RequestUserList onTabChange={onTabChange} UserState={UserState} />
      </div>
      <div className={`${steps !== "notification" && "hidden"}`}>
        <Notification onTabChange={onTabChange} UserState={UserState} />
      </div>
    </div>
  )
}

export default LeftSideBar