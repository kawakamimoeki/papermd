import { signIn } from 'next-auth/react'

export default function Component() {
  return (
    <>
      <button className="underline" onClick={() => signIn()}>
        Sign In
      </button>
    </>
  )
}
