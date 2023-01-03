import { AddressTypeEnum } from './nodes/nodes'

export enum ChainEnum {
  ETH = 'etherscan.io',
  AVAX = 'snowtrace.io',
  BSC = 'bscscan.com',
  ARBI = 'arbiscan.io',
}

export type NodeDisplayData = {
  label: string
  chain?: ChainEnum
  address?: string
  addressType?: AddressTypeEnum
}
