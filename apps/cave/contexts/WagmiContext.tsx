import { ReactNode } from 'react'
import { chain, defaultChains, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { concaveProvider, concaveRPC, concaveWSProvider, infuraId } from 'lib/providers'
import { NEXT_PUBLIC_ALCHEMY_ID } from 'lib/env.conf'

const chains = [chain.mainnet, chain.ropsten] // app supported chains

const connectors = (config) => [
  new InjectedConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Concave App',
      // jsonRpcUrl: concaveRPC,
      jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${NEXT_PUBLIC_ALCHEMY_ID}`,
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
