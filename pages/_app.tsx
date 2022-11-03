import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/header'
import '../styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Header></Header>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
