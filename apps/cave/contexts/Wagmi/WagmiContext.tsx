// import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { NODE_ENV } from 'lib/env.conf'
import { PropsWithChildren } from 'react'
import { configureChains, Connector, createClient, WagmiConfig } from 'wagmi'
import { goerli, mainnet, localhost, sepolia } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ImpersonateConnector } from './Connectors/ImpersonateConnector'
import { UnstoppableConnector } from './Connectors/UnstoppableConnector'

import { NEXT_PUBLIC_ALCHEMY_ID, NEXT_PUBLIC_INFURA_ID } from 'lib/env.conf'
import { multicallProvider } from 'multicall-provider/wagmi'

const isDevMode = NODE_ENV === 'development'

const concaveProviderConfig = {
  rpc: `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
  wss: `wss://mainnet.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_ID}`,
}

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, isDevMode && localhost, sepolia].filter(Boolean),
  [
    infuraProvider({ apiKey: NEXT_PUBLIC_INFURA_ID, priority: 1 }),
    alchemyProvider({ apiKey: NEXT_PUBLIC_ALCHEMY_ID, priority: 2 }),
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => {
        if (!isDevMode) return null
        if (chain.id !== localhost.id) return null
        return { http: localhost.rpcUrls.default.http[0] }
      },
    }),
  ],
)

export const concaveProvider = multicallProvider(provider)

export { chains }
export const supportedChainsId = chains.map((c) => c.id)

const connectors = [
  // new SafeConnector({ chains }),
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: false,
      rpc: {
        [mainnet.id]: concaveProviderConfig.rpc,
        [goerli.id]: concaveProviderConfig.rpc,
        [localhost.id]: localhost.rpcUrls.default.http[0],
        [sepolia.id]: sepolia.rpcUrls.default.http[0],
      },
    },
  }),
  new UnstoppableConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Concave App',
      jsonRpcUrl: concaveProviderConfig.rpc,
      appLogoUrl: 'https://app.concave.lol/assets/tokens/cnv.svg',
      darkMode: true,
      headlessMode: true,
    },
  }),
  isDevMode ? new ImpersonateConnector() : undefined,
].filter(Boolean) as Connector[]

// const isServer = typeof window === 'undefined'
// const isIframe = !isServer && window?.parent !== window

const client = createClient({
  autoConnect: true, //!isIframe,
  connectors,
  provider: concaveProvider,
  webSocketProvider,
})

// const AutoConnect = () => {
//   // auto connects to gnosis safe if in context
//   const { connect, connectors } = useConnect()
//   useEffect(() => {
//     const safeConnector = connectors.find((c) => c.id === 'safe' && c.ready)
//     if (safeConnector) connect({ connector: safeConnector })
//   }, [connectors, connect])
//   return null
// }

export const WagmiProvider = ({ children }: PropsWithChildren) => (
  <WagmiConfig client={client}>
    {/* {isIframe && <AutoConnect />} */}
    {children}
  </WagmiConfig>
)
