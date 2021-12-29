import { Mainnet, Config } from '@usedapp/core'
import { RPC } from 'config/rpc'

export const supportedNetworks = [Mainnet]

export const dappConfig: Config = {
  networks: supportedNetworks,
  readOnlyChainId: Mainnet.chainId, // default read only chain to connect
  readOnlyUrls: RPC,
  autoConnect: true,
}
