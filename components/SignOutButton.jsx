import { signOut } from 'next-auth/react'

export default function Component() {
  return (
    <>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}
