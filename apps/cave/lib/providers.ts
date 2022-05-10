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
// var p = new providers.JsonRpcProvider('http://MY_RPC_PUBLIC_IP:8545', false, 5);

export const rawProvider = new ethers.providers.JsonRpcProvider(
  `https://rpc.concave.lol/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`,
)

export const concaveProvider = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider(
      [
        // { provider: new providers.JsonRpcProvider(concaveRPC, chainId), priority: 2 },
        { provider: new providers.AlchemyProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID), priority: 2 },
        { provider: new providers.InfuraProvider(chainId, infuraId), priority: 2 },
      ],
      1,
    ),
  )

export const concaveWSProvider = (chainId: number) =>
  new providers.WebSocketProvider(concaveWSS, chainId)
