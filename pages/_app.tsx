import React from 'react'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import { dappConfig } from 'config'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import theme from 'theme'
import 'public/fonts.css'
import { useApollo } from 'lib/apollo'

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

const App = ({ Component, pageProps }: AppProps) => {
  // load Apollo
  const apolloClient = useApollo(pageProps.initialApolloProps)

  // this ensures the theme will be right even on ssr pages (won't flash wrong theme)
  const colorModeManager =
    typeof pageProps.cookies === 'string'
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager
  return (
    <ApolloProvider client={apolloClient}>
      <DAppProvider config={dappConfig}>
        <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
          <Component {...pageProps} />
        </ChakraProvider>
      </DAppProvider>
    </ApolloProvider>
  )
}

export default App
