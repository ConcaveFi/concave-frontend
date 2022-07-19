import { ReactNode } from 'react'
import { chain, createClient, defaultChains, WagmiConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { concaveProvider, concaveRPC, concaveWSProvider } from '../lib/providers'

const chains = [chain.mainnet, chain.rinkeby] // app supported chains

const connectors = [
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: { qrcode: false } }),
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
]

const isChainSupported = (chainId?: number) => defaultChains.some((x) => x.id === chainId)

const provider = ({ chainId }) =>
  concaveProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const webSocketProvider = ({ chainId }) =>
  concaveWSProvider(isChainSupported(chainId) ? chainId : chain.mainnet.id)

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export const WagmiProvider = ({ children }: { children: ReactNode }) =>
  WagmiConfig({ client, children })
