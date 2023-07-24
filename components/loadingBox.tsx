import React from 'react'

interface LoadingBoxProps {
  className: string
}
const LoadingBox: React.FC<LoadingBoxProps> = ({ className }) => {
  return <div className={`${className} w-full cursor-pointer bg-gray-300 flex justify-between items-center py-3 px-2`}></div>

}

export default LoadingBox