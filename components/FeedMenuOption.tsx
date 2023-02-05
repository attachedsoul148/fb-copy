import React from 'react'

interface Props {
  Icon: React.ReactElement
  title: string
  active?: boolean
}
const FeedMenuOption: React.FC<Props> = ({ Icon, title, active = false }) => {
  return (
    <div className="flex relative">
      <div
        className={`flex rounded-lg cursor-pointer space-x-2 items-center text-gray-500 justify-center px-8 py-4 lg:px-12 hover:bg-gray-100 ${
          active && 'text-blue-500'
        }`}>
        {Icon}
        <p className={`hidden lg:inline font-medium ${active && ' text-blue-500'}`}>{title}</p>
      </div>
      {active && <hr className="h-1 rounded-sm bg-blue-500 absolute w-full bottom-[-4px]" />}
    </div>
  )
}

export default FeedMenuOption
