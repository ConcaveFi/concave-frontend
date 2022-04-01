import { concaveProvider, concaveWSProvider, infuraId } from 'lib/providers'
import { ReactNode } from 'react'
import { chain, defaultChains, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

const supportedChains = [chain.mainnet]

const connectors = [
  new InjectedConnector({ chains: supportedChains }),
  new WalletLinkConnector({
    options: {
      appName: 'Concave App',
      jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
    },
  }),
  new WalletConnectConnector({
    chains: supportedChains,
    options: { infuraId: process.env.NEXT_PUBLIC_INFURA_ID, qrcode: true },
  }),
]

const isChainSupported = (chainId?: number) => defaultChains.some((x) => x.id === chainId)

const provider = ({ chainId }) =>
  concaveProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const webSocketProvider = ({ chainId }) =>
  concaveWSProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

export const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <Provider
    // autoConnect
    connectorStorageKey="concave"
    connectors={connectors}
    provider={provider}
    webSocketProvider={webSocketProvider}
  >
    {children}
  </Provider>
)
