/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PostType } from '@/typed'
import Image from 'next/image'

interface Props {
  post: PostType
}

const Post: React.FC<Props> = ({ post }) => {
  console.log(post.data.postImage)
  return (
    <div className="bg-white w-full rounded-lg border shadow flex flex-col py-2">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 ">
          <Image
            src={post.data.userImage}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full cursor-pointer"
          />

          <div className="flex flex-col">
            <div className="flex space-x-2 items-center">
              <h1 className="font-medium cursor-pointer hover:underline">{post.data.name}</h1>
              <h2 className="text-sm text-gray-500">{post.data.email}</h2>
            </div>
            <p className="text-xs text-gray-500">
              {new Date(post.data.timestamp * 1000).toUTCString()}
            </p>
          </div>
        </div>

        <div className="flex space-x-1 items-center">
          <EllipsisHorizontalIcon className="text-gray-500 hover:bg-gray-100 h-8 w-8 rounded-full cursor-pointer" />
          <XMarkIcon className="text-gray-500 hover:bg-gray-100 h-8 w-8 rounded-full cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="px-4 pt-2">{post.data.text}</p>
        {post.data.postImage && (
          <>
            <hr className="w-full m-0 border-t border-gray-300" />
            <img
              src={post.data.postImage}
              alt="avatar"
              className="cursor-pointer w-full px-2 rounded-lg"
            />
          </>
        )}
      </div>

      <hr className="w-full my-3 border-t border-gray-300" />

      <div className="flex justify-center">
        <div className="btn px-14">
          <HandThumbUpIcon className="text-gray-500 h-7 w-7" />
          <p className="text-gray-500 font-medium">Like</p>
        </div>
        <div className="btn px-14">
          <ChatBubbleBottomCenterTextIcon className="text-gray-500 h-7 w-7" />
          <p className="text-gray-500 font-medium">Comment</p>
        </div>
        <div className="btn px-4 lg:px-14">
          <ShareIcon className="text-gray-500 h-7 w-7" />
          <p className="text-gray-500 font-medium">Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
