import type { AppProps } from 'next/app'
import { ConcaveFonts } from '@concave/ui'
import { Styles } from '@chakra-ui/theme-tools'
import { NextPage } from 'next'
import { DefaultLayout } from 'components/Layout'
import { AppProviders } from 'contexts'
import { MetaHead, MetaProps } from 'components/MetaHead'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout
  return (
    <AppProviders globalStyles={globalStyles} cookies={pageProps?.cookies}>
      <ConcaveFonts />
      <MetaHead meta={Component.Meta} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  )
}

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}
