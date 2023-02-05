import Header from '@/components/Header'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import Login from '@/components/Login'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'

interface Props {
  session: Session | null
}

export default function Home({}: Props) {
  const [modal, setModal] = useState(false)
  const { status } = useSession()
  return (
    <>
      {status === 'authenticated' ? (
        <div
          className="scrollbar-hide"
          onClick={() => {
            setModal(false)
          }}>
          <Head>
            <title>Facebook</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              rel="icon"
              href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/800px-Facebook_Logo_%282019%29.png"
            />
          </Head>

          <Header modal={modal} setModal={() => setModal((prev) => !prev)} />

          <main className="pr-5 justify-start lg:p-0 flex bg-gray-100 h-auto xl:justify-between space-x-4 scrollbar-hide">
            <Sidebar />

            <Feed />

            <Widgets />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
