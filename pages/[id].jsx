import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSession, getSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function Component(props) {
  const post = props.post
  const { data: session } = useSession()
  let title = post.title
  const id = post.id
  const [content, setContent] = useState(post.content)
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (content.match(/^# (.+)/)) {
        title = content.match(/^# (.+)/)[1]
      }
      await axios.post('/api/posts/update', {
        id,
        title,
        content,
        author: {
          connect: {
            id: session.user.id,
            email: session.user.email
          }
        }
      })
      toast.success('Post saved', {
        position: 'bottom-center',
        autoClose: 500,
        hideProgressBar: true,
        progress: undefined,
        closeOnClick: false,
        theme: 'light'
      })
    }, 2000)
    return () => clearTimeout(timeOutId)
  }, [content, id, session])

  return (
    <div>
      <Head>
        <title>{title || 'post'} - papermd.dev</title>
        <meta
          name="description"
          content="minimal markdown app with Node.js backend"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MDEditor
          value={content}
          onChange={setContent}
          hideToolbar="true"
          height="calc(100vh - 4.5rem)"
        />
        <ToastContainer />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const post = await prisma.post.findFirst({
    where: { id: context.params.id, author: { email: session.user.email } }
  })
  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      post: post
    }
  }
}
