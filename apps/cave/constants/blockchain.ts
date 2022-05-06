import { ChainId } from '@concave/gemswap-sdk'
import ms from 'ms'

// used to refetch data on every block
// TODO: replace for websockets
export const AVERAGE_BLOCK_TIME = {
  [ChainId.ETHEREUM]: ms('14s'),
}
