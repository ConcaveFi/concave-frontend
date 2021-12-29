import React from 'react'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import { dappConfig } from 'config'
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import theme from 'theme'
import '@fontsource/pt-sans'

export function getServerSideProps({ req }) {
  return { props: { cookies: req.headers.cookie ?? '' } }
}

const App = ({ Component, pageProps }: AppProps) => {
  // this ensures the theme will be right even on ssr pages (won't flash wrong theme)
  const colorModeManager =
    typeof pageProps.cookies === 'string'
      ? cookieStorageManager(pageProps.cookies)
      : localStorageManager
  return (
    <DAppProvider config={dappConfig}>
      <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  )
}

export default App
