import Head from 'next/head'
import LP from '../components/lp'
import Home from '../components/home'
import { useSession, getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Index(props) {
  const { status } = useSession()
  let main
  if (status === 'authenticated') {
    main = <Home posts={props.posts}></Home>
  } else {
    main = <LP></LP>
  }
  return (
    <div>
      <Head>
        <title>papermd.dev</title>
        <meta
          name="description"
          content="minimal markdown app with Node.js backend"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {main}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session || !session.user) {
    return { props: {} }
  }
  const posts = await prisma.post.findMany({
    where: {
      author: {
        email: session.user.email
      }
    }
  })
  return {
    props: {
      posts: posts
    }
  }
}
