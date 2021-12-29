import { ChainId } from '@usedapp/core'

export const NETWORKS = {
  [ChainId.Mainnet]: {
    name: 'Ethereum',
    icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg',
  },
  [ChainId.Avalanche]: {
    name: 'Avalanche',
    icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg',
  },
  [ChainId.Polygon]: {
    name: 'Polygon',
    icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
  },
  [ChainId.Arbitrum]: {
    name: 'Arbitrum',
    icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum.jpg',
  },
}
