import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { ReactNode, useEffect } from 'react'
import { chain, Connector, createClient, defaultChains, useConnect, WagmiConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { concaveProvider, concaveRPC, concaveWSProvider } from '../../lib/providers'
import { UnstoppableConnector } from './Connectors/UnstoppableConnector'

const chains = [chain.mainnet, chain.goerli] // app supported chains
export const supportedChainsId = chains.map((c) => c.id)

const connectors = [
  new SafeConnector({ chains }),
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: { qrcode: false } }),
  new UnstoppableConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Concave App',
      jsonRpcUrl: concaveRPC,
      appLogoUrl: 'https://app.concave.lol/assets/tokens/cnv.svg',
      darkMode: true,
      headlessMode: true,
    },
  }),
] as Connector[]

const isChainSupported = (chainId?: number) => defaultChains.some((x) => x.id === chainId)

const provider = ({ chainId }) =>
  concaveProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const webSocketProvider = ({ chainId }) =>
  concaveWSProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const isServer = typeof window === 'undefined'
const isIframe = !isServer && window?.parent !== window

const client = createClient({
  autoConnect: !isIframe,
  connectors,
  provider,
  webSocketProvider,
})

const AutoConnect = () => {
  // auto connects to gnosis safe if in context
  const { connect, connectors } = useConnect()
  useEffect(() => {
    const safeConnector = connectors.find((c) => c.id === 'safe' && c.ready)
    if (safeConnector) connect({ connector: safeConnector })
  }, [connectors, connect])
  return null
}

export const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={client}>
    {isIframe && <AutoConnect />}
    {children}
  </WagmiConfig>
)
