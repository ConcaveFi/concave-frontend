import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { NEXT_PUBLIC_ALCHEMY_ID, NEXT_PUBLIC_INFURA_ID } from 'lib/env.conf'
import { ReactNode, useEffect } from 'react'
import { chain, Connector, createClient, defaultChains, useConnect, WagmiConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { concaveProvider, concaveProviderConfig, concaveWSProvider, hardhatProviderConfig } from '../../lib/providers'
import { UnstoppableConnector } from './Connectors/UnstoppableConnector'

export const chains = [chain.localhost, chain.goerli, chain.mainnet] // app supported chains

export const supportedChainsId = chains.map((c) => c.id)
const connectors = [
  new SafeConnector({ chains }),
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: { 
    qrcode: false,
    rpc: {
      [chain.mainnet.id]: concaveProviderConfig.rpc,
      [chain.localhost.id]: hardhatProviderConfig.rpc,
    },
 } }),
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
] as Connector[]

const isChainSupported = (chainId?: number) => supportedChainsId.some((x) => x === chainId)

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
