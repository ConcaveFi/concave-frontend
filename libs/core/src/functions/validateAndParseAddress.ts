import { getAddress } from '@ethersproject/address'
import invariant from 'tiny-invariant'
import warning from 'tiny-warning'

// warns if addresses are not checksummed
export function validateAndParseAddress(address: string): `0x${string}` {
  try {
    const checksummedAddress = getAddress(address)
    if (process.env.NODE_ENV !== 'test')
      warning(
        address === checksummedAddress,
        `${address} is not checksummed.\nPlease use ${checksummedAddress} instead.`,
      )
    return checksummedAddress as `0x${string}`
  } catch (error) {
    invariant(false, `${address} is not a valid address.`)
  }
}
