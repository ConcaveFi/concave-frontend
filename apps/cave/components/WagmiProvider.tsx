import { Provider, defaultChains, chain } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { providers } from 'ethers'
import { ReactNode } from 'react'

export const appNetwork =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ? chain.ropsten : chain.mainnet

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string

const connectors = [
  new InjectedConnector({ chains: [appNetwork] }),
  new WalletConnectConnector({
    chains: [appNetwork],
    options: { infuraId, qrcode: true },
  }),
]

const isChainSupported = (chainId?: number) => defaultChains.some((x) => x.id === chainId)

const concaveProviders = (chainId: number) => [
  new providers.JsonRpcProvider('https://api.concave.lol/', chainId),
  providers.getDefaultProvider(chainId, { alchemy, etherscan, infuraId }),
]

const provider = ({ chainId }) =>
  new providers.FallbackProvider(
    concaveProviders(isChainSupported(chainId) ? chainId : appNetwork.id),
  )
const webSocketProvider = ({ chainId }) =>
  new providers.InfuraWebSocketProvider(
    isChainSupported(chainId) ? chainId : appNetwork.id,
    infuraId,
  )

export const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <Provider
    autoConnect
    connectorStorageKey="concave"
    connectors={connectors}
    provider={provider}
    webSocketProvider={webSocketProvider}
  >
    {children}
  </Provider>
)
