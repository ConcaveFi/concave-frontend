import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { ConcaveFonts, ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'components/WagmiProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

const App = ({ Component, pageProps }: AppProps) => {
  // load Apollo
  const apolloClient = useApollo(pageProps.initialApolloProps)
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <ThemeProvider cookies={pageProps.cookies}>
            <ConcaveFonts />
            <Component {...pageProps} />
          </ThemeProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default App
