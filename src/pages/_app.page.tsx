import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { DefaultSeo } from 'next-seo'
import { globalStyles } from '../styles/global'
import { queryClient } from '../lib/react-query'
import '../lib/dayjs'

const roboto = Roboto({ weight: ['400', '500', '700'] })
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: 'https://www.url.ie/',
            siteName: 'SiteName',
          }}
        />
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryClientProvider>
  )
}
