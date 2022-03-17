import type { AppProps } from 'next/app'
import { ConcaveFonts, Image, ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'contexts/WagmiContext'
import { AuthProvider } from 'contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { Styles } from '@chakra-ui/theme-tools'
import { NextPage } from 'next'
import { DefaultLayout } from 'components/Layout'

const globalStyles: Styles = {
  global: {
    html: {
      fontFamily: 'body',
      color: 'whiteAlpha.900',
      lineHeight: 'base',
      colorScheme: 'dark',
    },
    body: {
      // minHeight: '120vh', // temporary
    },
  },
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(() => new QueryClient())
  const Layout = Component.Layout || DefaultLayout
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <AuthProvider>
          <ThemeProvider globalStyles={globalStyles} cookies={pageProps.cookies}>
            <Image
              zIndex={-1}
              pos="fixed"
              top="-10px"
              h="100vh"
              w="100vw"
              src="/background.jpg"
              alt=""
            />
            <ConcaveFonts />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

export default App
