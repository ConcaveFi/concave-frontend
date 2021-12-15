import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const INFURA_APP_ID = process.env.INFURA_APP_ID

export const walletconnect = new WalletConnectConnector({
  infuraId: INFURA_APP_ID,
  qrcode: true,
})
