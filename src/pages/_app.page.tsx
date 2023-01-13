import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import { globalStyles } from '../styles/global'
import '../lib/dayjs'
import { queryClient } from '../lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

const roboto = Roboto({ weight: ['400', '500', '700'] })
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryClientProvider>
  )
}
