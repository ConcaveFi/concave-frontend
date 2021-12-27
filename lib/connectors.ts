import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { RPC, supportedNetworks } from 'lib/dappConfig'

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds: supportedNetworks.map((n) => n.chainId),
})
