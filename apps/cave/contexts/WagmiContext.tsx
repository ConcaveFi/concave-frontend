import { concaveProvider, concaveRPC, concaveWSProvider, infuraId } from 'lib/providers'
import { ReactNode } from 'react'
import { chain, defaultChains, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

const chains = [chain.mainnet, chain.ropsten] // app supported chains

const connectors = (config) => [
  new InjectedConnector({ chains }),
  new WalletLinkConnector({
    chains,
    options: {
      appName: 'Concave App',
      // chainId: config.chainId,
      jsonRpcUrl: concaveRPC,
      // appLogoUrl: 'https://concave.lol/assets/concave/logomark.png',
      darkMode: true,
    },
  }),
  new WalletConnectConnector({
    chains,
    options: { infuraId, qrcode: true, chainId: config.chainId },
  }),
]

const isChainSupported = (chainId?: number) => defaultChains.some((x) => x.id === chainId)

const provider = ({ chainId }) =>
  concaveProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const webSocketProvider = ({ chainId }) =>
  concaveWSProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const client = {
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
}

export const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <Provider {...client}>{children}</Provider>
)
