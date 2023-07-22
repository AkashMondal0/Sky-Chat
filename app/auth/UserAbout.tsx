import React from 'react'

const UserAbout: React.FC = () => {
    return (
        <div> <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
        <img src="http://source.unsplash.com/100x100/?woman" className="rounded-full" />
        <div className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-red-500" />
      </div></div>
    )
}

export default UserAbout