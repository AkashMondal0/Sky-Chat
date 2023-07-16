import React from 'react'
import MyUserList from './myUserList'
import RequestUserList from './requestUserList'
import SearchUserList from './searchUserList'
import SideContainer from './SideContainer'
import { User, UserContextIn } from '@/interfaces/User'
export type steps = "myUserList" | "requestUserList" | "searchUserList"

interface SideBar {
  UserState: UserContextIn
}

const SideBar: React.FC<SideBar> = ({
  UserState
}) => {
  const [steps, setSteps] = React.useState<steps>("myUserList")

  const onTabChange = (value: steps) => {
    setSteps(value)
  }

  return (
    <SideContainer>
      <div className={`${steps !== "searchUserList" && "hidden"}`}>
        <SearchUserList onTabChange={onTabChange} UserState={UserState} />
      </div>
      <div className={`${steps !== "requestUserList" && "hidden"}`}>
        <RequestUserList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "myUserList" && "hidden"}`}>
        <MyUserList onTabChange={onTabChange} UserState={UserState} />
      </div>
    </SideContainer>
  )
}

export default SideBar