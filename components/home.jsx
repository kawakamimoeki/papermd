import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Box } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { AiOutlineMore } from 'react-icons/ai'

export default function Component(props) {
  const [posts, setPosts] = useState(props.posts)
  const { data: session } = useSession()
  let router = useRouter()
  async function createPost() {
    const res = await axios.post('/api/posts/create', {
      title: 'Untitled',
      content: '',
      author: {
        connect: {
          id: session.user.id,
          email: session.user.email
        }
      }
    })
    router.push(`/${res.data.id}`)
  }
  async function deletePost(id) {
    console.log(id)
    await axios.post('/api/posts/delete', {
      id: id
    })
    setPosts(posts.filter((p) => p.id !== id))
  }

  return (
    <main className="p-4">
      <section className="flex flex-wrap">
        {posts?.map((post, i) => (
          <Box w="25%" key={i} p={3}>
            <Box
              onClick={(event) => {
                event.preventDefault()
                if (event.target.dataset.eventPrevent !== 'true') {
                  router.push(`/${post.id}`)
                }
              }}
              px={8}
              py={2}
              className="bg-white flex border-2 cursor-pointer"
              borderRadius={3}>
              <h2 className="inline-block py-3">{post.title}</h2>
              <div className="flex-grow"></div>
              <Menu className="inline-block float-right">
                <MenuButton
                  className="hover:bg-slate-100 rounded-full py-2 px-4"
                  data-event-prevent={true}>
                  <AiOutlineMore />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    data-event-prevent={true}
                    onClick={() => {
                      deletePost(post.id)
                    }}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        ))}
        <Box p={3}>
          <Box
            cursor="pointer"
            onClick={createPost}
            px={8}
            py={2}
            className="border-2 bg-white"
            borderRadius={3}>
            <h2 className="py-3">+</h2>
          </Box>
        </Box>
      </section>
    </main>
  )
}
