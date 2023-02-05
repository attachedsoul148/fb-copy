import Image from 'next/image'
import React, { useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
} from '@heroicons/react/24/solid'
import { signOut, useSession } from 'next-auth/react'

interface Props {
  modal: boolean
  setModal: () => void
}

const Header: React.FC<Props> = ({ modal, setModal }) => {
  const { data: session } = useSession()
  return (
    <div className="px-3 py-3 shadow flex items-center justify-between border relative space-x-2">
      <div className="flex items-center space-x-3">
        <Image width={130} height={35} alt="logo" src={'/logo.png'} />
      </div>

      <div className="flex lg:justify-center flex-grow space-x-5 xl:space-x-10 lg:max-w-2xl">
        <div className="lg:w-full flex items-center bg-gray-100 rounded-full px-2 py-2 font-medium hover:bg-gray-200 transition-colors">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          <input
            type="text"
            className="hidden lg:inline-block bg-transparent outline-none px-2 text-sm"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <ChatBubbleLeftEllipsisIcon className="icon" />
        <BellIcon className="icon" />
        <Image
          width={40}
          height={40}
          src={session?.user?.image!}
          alt="avatar"
          className="drop-shadow rounded-full cursor-pointer"
          onClick={(e) => {
            setModal()
            e.stopPropagation()
          }}
        />
      </div>
      {modal && (
        <div
          className="w-72 shadow-md p-3 absolute bg-white top-16 right-3 rounded-lg border xl:w-96"
          onClick={(e) => e.stopPropagation()}>
          <div className="shadow flex items-center p-2 rounded-lg border flex-col">
            <div className="flex w-full items-center space-x-2 hover:bg-gray-100 cursor-pointer rounded-lg p-2">
              <Image
                width={40}
                height={40}
                src={session?.user?.image!}
                alt="avatar"
                className="rounded-full"
              />
              <p className="font-medium">{session?.user?.name!}</p>
            </div>

            <hr className="my-2 text-gray-500 w-full" />
            <p className="hover:bg-gray-100 font-medium text-blue-500 px-2 py-1 rounded-lg cursor-pointer w-full">
              See your profile
            </p>
            <p
              onClick={() => signOut()}
              className="hover:bg-gray-100 font-medium text-red-500 px-2 py-1 rounded-lg cursor-pointer w-full">
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
