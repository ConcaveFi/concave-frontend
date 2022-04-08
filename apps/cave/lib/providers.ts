import { providers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
export const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const concaveKey = process.env.NEXT_PUBLIC_CONCAVE_RPC_KEY

export const concaveRPC = `https://api.concave.lol/node/${concaveKey}`

export const concaveProvider = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider([
      { provider: new providers.JsonRpcProvider(concaveRPC, chainId), priority: 0 },
      { provider: new providers.AlchemyProvider(chainId, alchemy), priority: 1 },
      { provider: new providers.InfuraProvider(chainId, infuraId), priority: 1 },
      // providers.getDefaultProvider(chainId, { alchemy, etherscan, infuraId }),
    ]),
  )

export const concaveWSProvider = (chainId: number) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)
