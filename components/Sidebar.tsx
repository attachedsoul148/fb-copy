import React from 'react'
import {
  HomeIcon,
  TvIcon,
  UserGroupIcon,
  UsersIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/solid'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline'
import SidebarOption from './SidebarOption'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="w-auto bg-white border-r flex flex-col py-3 px-2 lg:min-w-[300px] lg:border-none lg:bg-transparent">
      <SidebarOption Icon={<HomeIcon className="h-6 w-6 text-blue-500" />} title="Home" active />
      <SidebarOption
        Icon={
          <Image
            width={24}
            height={24}
            src={session?.user?.image!}
            alt="avatar"
            className="rounded-full"
          />
        }
        title={session?.user?.name!}
      />
      <hr className="w-full my-2 border-t border-gray-300 max-w-[95%] mx-auto" />
      <SidebarOption Icon={<TvIcon className="h-6 w-6 text-blue-500" />} title="Watch" />
      <SidebarOption Icon={<UsersIcon className="h-6 w-6 text-blue-500" />} title="Friends" />
      <SidebarOption
        Icon={<BuildingStorefrontIcon className="h-6 w-6 text-blue-500" />}
        title="Marketplace"
      />
      <SidebarOption Icon={<EllipsisHorizontalCircleIcon className="h-6 w-6" />} title="See all" />
      <hr className="w-full my-3 border-t border-gray-300 max-w-[95%] mx-auto" />
      <SidebarOption Icon={<UserGroupIcon className="h-6 w-6" />} title="See all groups" />
      <hr className="w-full my-3 border-t border-gray-300 max-w-[95%] mx-auto" />
    </div>
  )
}

export default Sidebar
