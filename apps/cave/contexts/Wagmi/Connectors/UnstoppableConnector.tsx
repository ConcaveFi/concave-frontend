import { ExtendedWalletConnectConnector } from './WalletConnectConnector'

export class UnstoppableConnector extends ExtendedWalletConnectConnector {
  name = 'Unstoppable'
  id = 'unstoppable'
  wcLink = { universal: 'https://unstoppabledomains.com/mobile' }
}
