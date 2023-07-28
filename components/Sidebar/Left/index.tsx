import React, { useEffect } from 'react'
import MyConversationList from './Tabs/myConversationList'
import SearchUserList from './Tabs/searchUserList'
import RequestUserList from './Tabs/requestUserList'
import Notification from './Tabs/notification'
import useUser from '@/hooks/states/useUser'
import GroupConversation from './Tabs/groupConversation'
export type steps = "myUserList" | "requestUserList" | "searchUserList" | "notification" | "groupConversation"

interface LeftSideBar {
  // UserState: UserState
}

const LeftSideBar: React.FC<LeftSideBar> = ({
  // UserState
}) => {
  const [steps, setSteps] = React.useState<steps>("myUserList")
  const currentUser = useUser()
  const onTabChange = (value: steps) => {
    setSteps(value)
  }

  return (
    <>{currentUser.state?.id && <div className='w-full'>
      <div className={`${steps !== "myUserList" && "hidden"}`}>
        <MyConversationList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "searchUserList" && "hidden"}`}>
        <SearchUserList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "requestUserList" && "hidden"}`}>
        <RequestUserList onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "notification" && "hidden"}`}>
        <Notification onTabChange={onTabChange} />
      </div>
      <div className={`${steps !== "groupConversation" && "hidden"}`}>
        <GroupConversation onTabChange={onTabChange} />
      </div>
    </div>}</>
  )
}

export default LeftSideBar