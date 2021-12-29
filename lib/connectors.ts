import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { supportedNetworks } from 'config'
import { RPC } from 'config/rpc'

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds: supportedNetworks.map((n) => n.chainId),
})
