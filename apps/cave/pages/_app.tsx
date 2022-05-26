import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ConcaveFonts } from '@concave/ui'
import { Styles } from '@chakra-ui/theme-tools'
import { DefaultLayout } from 'components/Layout'
import { AppProviders } from 'contexts'
import { MetaHead, MetaProps } from 'components/MetaHead'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import { NODE_ENV } from 'lib/env.conf'
import * as gtag from '../lib/analytics'
import React from 'react'

const globalStyles: Styles = {
  global: {
    html: {
      fontFamily: 'body',
      color: 'text.high',
      lineHeight: 'base',
      colorscheme: 'dark',
      bgImage: 'url(/background.jpg)',
      bgColor: '#121115',
    },
    '::selection': {
      bgColor: '#080c0fad',
      color: 'text.high',
    },
  },
}

const progress = new ProgressBar({
  size: 4,
  color: '#44B9DE',
  className: 'z-50',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
  Meta?: MetaProps
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

let prevPath = ''

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout
  const router = useRouter()

  useEffect(() => {
    prevPath = router.pathname
  }, [router.pathname])

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (NODE_ENV === 'production') gtag.trackPageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  const t = '1'

  return (
    <AppProviders globalStyles={globalStyles} cookies={pageProps?.cookies}>
      <ConcaveFonts />
      <MetaHead meta={Component.Meta} />
      <ErrorBoundary>
        <Layout>
          <Component
            {...pageProps}
            prevPath={prevPath}
            path={router.pathname}
            key={router.pathname}
          />
        </Layout>
      </ErrorBoundary>
    </AppProviders>
  )
}

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}
function logErrorToMyService(error: any, errorInfo: any) {
  throw new Error('Function not implemented.')
}

class ErrorBoundary extends React.Component {
  public state: { hasError: boolean }
  public props: any
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
