import React from 'react'
import { steps } from '.'
interface requestUserList {
    onTabChange: (value: steps) => void
}
const requestUserList: React.FC<requestUserList> = ({ onTabChange }) => {
    return <div onClick={() => { onTabChange("myUserList") }}>
        Back
    </div>
}

export default requestUserList