import { providers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'
import {
  NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_CONCAVE_RPC_KEY,
  NEXT_PUBLIC_INFURA_ID,
} from './env.conf'

export const concaveRPC = `https://rpc.concave.lol/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`
export const concaveWSS = `wss://rpc.concave.lol/ws/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`

const NoProviderKeyError = `Concave Provider
  You need to set at least one provider key in your .env file, examples in .env.example`

const stallTimeout = 500 // timeout in milliseconds after which another provider will be attempted.
const getFallbackProviders = (chainId: number) => {
  const providerConfigs = []

  if (NEXT_PUBLIC_CONCAVE_RPC_KEY && chainId === 1)
    providerConfigs.push({
      provider: new providers.StaticJsonRpcProvider(concaveRPC, chainId),
      priority: 0,
      stallTimeout,
    })

  if (NEXT_PUBLIC_INFURA_ID)
    providerConfigs.push({
      provider: new providers.InfuraProvider(chainId, NEXT_PUBLIC_INFURA_ID),
      priority: 1,
      stallTimeout,
    })

  if (NEXT_PUBLIC_ALCHEMY_ID)
    providerConfigs.push({
      provider: new providers.AlchemyProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID),
      priority: 2,
      stallTimeout,
    })

  if (providerConfigs.length === 0) throw NoProviderKeyError

  return providerConfigs
}

export const concaveProvider = (chainId: number) =>
  // new multicallProvider.MulticallProvider(
  new providers.FallbackProvider(getFallbackProviders(chainId), 1)
// )

export const concaveWSProvider = (chainId: number) => {
  if (NEXT_PUBLIC_CONCAVE_RPC_KEY) return new providers.WebSocketProvider(concaveWSS, chainId)
  if (NEXT_PUBLIC_INFURA_ID)
    return new providers.InfuraWebSocketProvider(chainId, NEXT_PUBLIC_INFURA_ID)
  if (NEXT_PUBLIC_ALCHEMY_ID)
    return new providers.AlchemyWebSocketProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID)
  throw NoProviderKeyError
}
