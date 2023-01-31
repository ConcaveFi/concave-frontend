// import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { NODE_ENV } from 'lib/env.conf'
import { ReactNode, useEffect } from 'react'
import { Connector, createClient, useConnect, WagmiConfig } from 'wagmi'
import { goerli, mainnet, localhost } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { concaveProvider, concaveProviderConfig, concaveWSProvider } from '../../lib/providers'
import { ImpersonateConnector } from './Connectors/ImpersonateConnector'
import { UnstoppableConnector } from './Connectors/UnstoppableConnector'

export const chains = [localhost, goerli, mainnet] // app supported chains
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
  NODE_ENV === 'development' ? new ImpersonateConnector() : undefined,
].filter(Boolean) as Connector[]

const isChainSupported = (chainId?: number) => supportedChainsId.some((x) => x === chainId)

const provider = ({ chainId }) => concaveProvider(isChainSupported(chainId) ? chainId : mainnet.id)

const webSocketProvider = ({ chainId }) =>
  concaveWSProvider(isChainSupported(chainId) ? chainId : mainnet.id)

// const isServer = typeof window === 'undefined'
// const isIframe = !isServer && window?.parent !== window

const client = createClient({
  autoConnect: true, //!isIframe,
  connectors,
  provider,
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

export const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={client}>
    {/* {isIframe && <AutoConnect />} */}
    {children}
  </WagmiConfig>
)
