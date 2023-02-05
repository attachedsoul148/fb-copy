/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { FilmIcon, BookOpenIcon, VideoCameraIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import FeedMenuOption from './FeedMenuOption'
import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db, storage } from '@/firebase'
import { ref, getDownloadURL, uploadString, uploadBytesResumable } from 'firebase/storage'
import Post from './Post'
import { PostType } from '@/typed'

const reels = [
  {
    id: 1,
    views: '984K',
    picture: 'https://i.pinimg.com/564x/5e/61/25/5e612526bbaeef2865dea85f6a7d3750.jpg',
    authorAvatar: 'https://i.pinimg.com/564x/77/e8/b7/77e8b7adf44f89980fea3e7c82d328ad.jpg',
  },
  {
    id: 2,
    views: '1.4M',
    picture: 'https://i.pinimg.com/564x/11/8b/28/118b285f16865e09edd659789056e4c3.jpg',
    authorAvatar: 'https://i.pinimg.com/564x/b5/01/1e/b5011e2e7a44d358a829d8ec5194a9ff.jpg',
  },
  {
    id: 3,
    views: '1.1M',
    picture: 'https://i.pinimg.com/736x/7f/e9/fb/7fe9fbb7750ea97c33436795d28db1e0.jpg',
    authorAvatar: 'https://i.pinimg.com/564x/77/e8/b7/77e8b7adf44f89980fea3e7c82d328ad.jpg',
  },
  {
    id: 4,
    views: '860K',
    picture: 'https://i.pinimg.com/564x/4a/32/46/4a32465b2134b1fbe425337afc0697f7.jpg',
    authorAvatar: 'https://i.pinimg.com/564x/de/a2/6b/dea26bbdaf67920e725f1fe941f37ab8.jpg',
  },
  {
    id: 5,
    views: '1.5M',
    picture: 'https://i.pinimg.com/564x/e3/72/19/e372198e0c03cecc7952585d6280307d.jpg',
    authorAvatar: 'https://i.pinimg.com/564x/5e/2a/49/5e2a491223c1c00db17e4c59de09a3d4.jpg',
  },
]

const Feed = () => {
  const active = true
  const { data: session } = useSession()

  const formInputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [postImage, setPostImage] = useState<string | null>(null)
  const [posts, setPosts] = useState<PostType[]>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value) {
      addDoc(collection(db, 'posts'), {
        //add main date
        name: session?.user?.name,
        email: session?.user?.email,
        userImage: session?.user?.image,
        text: value,
        timestamp: Timestamp.now(),
      }).then((document) => {
        const storageRef = ref(storage, `posts/${document.id}`)
        //creation of link in storage to be able to find one that we need like id
        if (postImage) {
          uploadString(storageRef, postImage, 'data_url').then((snapshot) => {
            //upload string , format are important
            getDownloadURL(snapshot.ref).then((url) => {
              setDoc(
                //update our doc with image if it exists
                doc(db, 'posts', document.id),
                {
                  postImage: url, //add new field in old object
                },
                { merge: true }, //if we don't write merge : true old object will be replaced
              )
            })
          })
        }
      })
    }
    setValue('')
    setPostImage(null)
  }

  const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    if (!e.target.files) return

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]) // try to give me this image in base64 format
    }
    reader.onload = (readerEvent) => {
      // when it gives me my url back it will
      setPostImage(readerEvent.target?.result as string)
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
        setPosts(newPosts as PostType[])
      },
    )

    return () => {
      unsub()
    }
  }, [])
  return (
    <div className="flex flex-col max-w-[680px] py-5 space-y-5 scrollbar-hide">
      <div className="bg-white w-full rounded-lg border shadow">
        <div className="flex justify-center py-1 space-x-2 px-1">
          <FeedMenuOption
            Icon={
              <FilmIcon className={`h-6 w-6 lg:h-8 lg:w-8  ${active == true && 'text-blue-500'}`} />
            }
            title={'Reels'}
            active
          />
          <FeedMenuOption
            Icon={<BookOpenIcon className="h-6 w-6 lg:h-8 lg:w-8" />}
            title={'Stories'}
          />
          <FeedMenuOption
            Icon={<VideoCameraIcon className="h-6 w-6 lg:h-8 lg:w-8" />}
            title={'Rooms'}
          />
        </div>

        <hr />

        <div className="p-4 gap-4 justify-center overflow-x-scroll scrollbar-hide flex">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="relative rounded-lg overflow-hidden cursor-pointer hover:animate-pulse">
              <img alt="reel" src={reel.picture} className="object-cover w-28 h-48 rounded-lg" />
              <p className="text-sm md:text-md absolute bottom-1 left-2 text-white font-medium">
                {reel.views}
              </p>
              <img
                alt="avatar"
                src={reel.authorAvatar}
                className="object-cover absolute top-1 left-1 rounded-full w-8 h-8"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white w-full rounded-lg border shadow px-4 py-2 flex flex-col">
        <div className="flex space-x-2">
          <Image
            width={40}
            height={40}
            src={session?.user?.image!}
            alt="avatar"
            className="rounded-full"
          />

          <form className="bg-gray-100 rounded-full w-full" onSubmit={onSubmit}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Write your thoughts"
              className="px-4 py-2 border-0 bg-transparent outline-none font-medium w-full"
            />
            <button hidden type="submit" />
          </form>
          {postImage && (
            <img
              src={postImage}
              alt="postPhoto"
              className="max-h-[40px] cursor-pointer hover:scale-105 hover:brightness-105 transition duration-100"
              onClick={() => setPostImage(null)}
            />
          )}
        </div>

        <hr className="w-full my-3 border-t border-gray-300" />

        <div className="flex justify-center">
          <div className="btn">
            <CameraIcon className="text-red-500 h-7 w-7" />
            <p className="text-gray-500 font-medium">Live video</p>
          </div>
          <div onClick={() => formInputRef.current?.click()} className="btn">
            <PhotoIcon className="text-green-500 h-7 w-7" />
            <p className="text-gray-500 font-medium">Photo/video</p>
            <input type="file" hidden ref={formInputRef} onChange={readFile} />
          </div>
          <div className="btn">
            <FaceSmileIcon className="text-yellow-500 h-7 w-7" />
            <p className="text-gray-500 font-medium">Feeling/activity</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
