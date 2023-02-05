import React from 'react'

interface Props {
  Icon: React.ReactElement
  title: string
  active?: boolean
}
const SidebarOption: React.FC<Props> = ({ Icon, title, active = false }) => {
  return (
    <div className="flex relative">
      {active && <hr className="h-10 w-1 rounded-sm bg-blue-500 absolute left-[-8px]" />}
      <div
        className={`w-full
     transition-colors flex items-center bg-transparent hover:bg-gray-200
      active:bg-gray-300 rounded-lg py-2 px-3 space-x-4 cursor-pointer`}>
        {Icon}
        <p className="hidden lg:inline text-md font-medium">{title}</p>
      </div>
    </div>
  )
}

export default SidebarOption
