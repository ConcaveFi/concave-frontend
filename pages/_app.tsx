import React from 'react'
import type { AppProps } from 'next/app'
import { Mainnet, Rinkeby, Avalanche, Config, DAppProvider } from '@usedapp/core'
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import theme from 'theme'

const INFURA_APP_ID = process.env.INFURA_APP_ID

const dappConfig: Config = {
  networks: [Mainnet, Rinkeby, Avalanche],
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${INFURA_APP_ID}`,
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${INFURA_APP_ID}`,
  },
  autoConnect: true,
}

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
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  )
}

export default App
