import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { ConcaveFonts, Image, ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'components/WagmiProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { Styles } from '@chakra-ui/theme-tools'
import { NextPage } from 'next'
import { DefaultLayout } from 'components/Layout'

const globalStyles: Styles = {
  global: (props) => ({
    html: {
      fontFamily: 'body',
      color: 'whiteAlpha.900',
      lineHeight: 'base',
      colorScheme: 'dark',
    },
    body: {
      // minHeight: '120vh', // temporary
    },
  }),
}

type NextPageWithLayout = NextPage & {
  getLayout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps.initialApolloProps)
  const [queryClient] = useState(() => new QueryClient())
  const Layout = Component.getLayout || DefaultLayout
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <ThemeProvider globalStyles={globalStyles} cookies={pageProps.cookies}>
            <Image zIndex={-1} pos="absolute" inset={0} src="/background.jpg" alt="" />
            <ConcaveFonts />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

export default App
