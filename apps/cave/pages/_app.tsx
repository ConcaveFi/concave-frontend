import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { ConcaveFonts, ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'components/WagmiProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { Styles } from '@chakra-ui/theme-tools'

const globalStyles: Styles = {
  global: (props) => ({
    html: {
      fontFamily: 'body',
      color: 'whiteAlpha.900',
      lineHeight: 'base',
      colorScheme: 'dark',
    },
    body: {
      bgImage: 'url(/assets/cave-bg.jpeg)', // <img/> component for this may be more performant
      zIndex: -1,

      minHeight: '120vh', // temporary
    },
  }),
}

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloProps)
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <ThemeProvider globalStyles={globalStyles} cookies={pageProps.cookies}>
            <ConcaveFonts />
            <Component {...pageProps} />
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
