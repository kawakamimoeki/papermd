import { useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'
import Link from 'next/link'

export default function Component() {
  const { status } = useSession()
  if (status === 'authenticated') {
    return (
      <header className="flex p-6 border-b-2">
        <p className="text-lg">
          <Link href="/">papermd.dev</Link>
        </p>
        <div className="grow"></div>
        <SignOutButton />
      </header>
    )
  } else {
    return <></>
  }
}
