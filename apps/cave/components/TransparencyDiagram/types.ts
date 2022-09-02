import { AddressTypeEnum } from './nodes/nodes'

export enum ChainEnum {
  ETH = 'etherscan.io',
  AVAX = 'snowtrace.io',
  BSC = 'bscscan.com/',
}

export type NodeDisplayData = {
  label: string
  chain?: ChainEnum
  address?: string
  addressType?: AddressTypeEnum
}

export type ShapeLabelSettingsType = {
  labelLeft?: string
  labelBottom: string
}
