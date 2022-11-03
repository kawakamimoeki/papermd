import SignInButton from './SignInButton'

export default function Component() {
  return (
    <main className="h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl">papermd.dev</h1>
        <SignInButton></SignInButton>
      </div>
    </main>
  )
}
