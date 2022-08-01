export enum AddressTypeEnum {
  TOKEN = 'token',
  CONTRACT = 'address',
}

// export enum ChainEnum {
//   AVAX = 'snowtrace.io',
// }

export type NodeDisplayData = {
  label: string
  // chain?: ChainEnum
  address: string
  addressType: AddressTypeEnum
}

export type ShapeSettingsType = {
  path: string
  fill: string
  height: string
  width: string
  viewBox: string
  labelLeft: string
  labelBottom: string
}
