import React from 'react'
import MyUserList from './myUserList'
import RequestUserList from './requestUserList'
import SearchUserList from './searchUserList'
import SideContainer from './SideContainer'

export type steps = "myUserList" | "requestUserList" | "searchUserList"

const SideBar = () => {
  const [steps, setSteps] = React.useState<steps>("myUserList")
  const onTabChange = (value: steps) => {
    setSteps(value)
  }

  if (steps === "requestUserList") {
    return (<SideContainer><RequestUserList onTabChange={onTabChange} /></SideContainer>)
  }

  if (steps === "searchUserList") {
    return (<SideContainer><SearchUserList onTabChange={onTabChange} /></SideContainer>)
  }

  return (<SideContainer><MyUserList onTabChange={onTabChange} /></SideContainer>)
}

export default SideBar