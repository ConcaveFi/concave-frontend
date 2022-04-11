import { ChainId } from 'gemswap-sdk'
import ms from 'ms'

// used to refetch data on every block
export const AVERAGE_BLOCK_TIME = {
  [ChainId.ETHEREUM]: ms('14s'),
}
