import { ChainId } from '@usedapp/core'

export const RPC = {
  [ChainId.Mainnet]: 'https://eth-mainnet.alchemyapi.io/v2/NTHRe8JdJXvX1FR3zKgdRA_mUwAyiwEJ',
  // [ChainId.Rinkeby]: 'https://eth-rinkeby.alchemyapi.io/v2/NTHRe8JdJXvX1FR3zKgdRA_mUwAyiwEJ',
  [ChainId.Polygon]: 'https://polygon-rpc.com/',
  [ChainId.Mumbai]: 'https://rpc-mumbai.matic.today',
  [ChainId.xDai]: 'https://rpc.xdaichain.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSCTestnet]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
  [ChainId.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.Arbitrum]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.Fantom]: 'https://rpcapi.fantom.network',
  [ChainId.Fantom]: 'https://rpc.testnet.fantom.network',
}
