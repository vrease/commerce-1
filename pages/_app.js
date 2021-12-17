import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { useEffect } from 'react'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
