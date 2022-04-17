import type { AppProps } from 'next/app'
import { ConcaveFonts, Image, ThemeProvider } from '@concave/ui'
import { Styles } from '@chakra-ui/theme-tools'
import { NextPage } from 'next'
import { DefaultLayout } from 'components/Layout'
import { AppProviders } from 'contexts'

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

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout
  return (
    <AppProviders globalStyles={globalStyles} cookies={pageProps?.cookies}>
      <ConcaveFonts />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  )
}

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}
