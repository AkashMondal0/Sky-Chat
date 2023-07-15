import React from 'react'
import { steps } from '.'

interface SearchUserList {
  onTabChange: (value: steps) => void
}
const SearchUserList: React.FC<SearchUserList> = ({ onTabChange }) => {
  return <div onClick={()=>{onTabChange("myUserList")}}>back</div>
}
export default SearchUserList
