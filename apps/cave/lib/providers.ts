import { providers, ethers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'
import {
  NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_CONCAVE_RPC_KEY,
  NEXT_PUBLIC_INFURA_ID,
} from './env.conf'

export const infuraId = NEXT_PUBLIC_INFURA_ID
export const concaveRPC = `https://rpc.concave.lol/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`
export const concaveWSS = `wss://rpc.concave.lol/ws/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`

export const rawProvider = new ethers.providers.InfuraProvider('ropsten', infuraId)

export const concaveProvider = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider([
      { provider: new providers.JsonRpcProvider(concaveRPC, chainId), priority: 1 },
      // { provider: new providers.AlchemyProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID), priority: 2 },
      // { provider: new providers.InfuraProvider(chainId, infuraId), priority: 2 },
      providers.getDefaultProvider(chainId, {
        NEXT_PUBLIC_ALCHEMY_ID,
        // NEXT_PUBLIC_ETHERSCAN_API_KEY,
        infuraId,
      }),
    ]),
  )

export const concaveWSProvider = (chainId: number) =>
  new providers.WebSocketProvider(concaveWSS, chainId)
