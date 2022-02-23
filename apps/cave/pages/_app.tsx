import React from 'react'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'
import { ConcaveFonts, ThemeProvider } from '@concave/ui'
import { WagmiProvider } from 'components/WagmiProvider'

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

const App = ({ Component, pageProps }: AppProps) => {
  // load Apollo
  const apolloClient = useApollo(pageProps.initialApolloProps)
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiProvider>
        <ThemeProvider cookies={pageProps.cookies}>
          <ConcaveFonts />
          <Component {...pageProps} />
        </ThemeProvider>
      </WagmiProvider>
    </ApolloProvider>
  )
}

export default App
