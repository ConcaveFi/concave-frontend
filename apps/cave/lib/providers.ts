import { providers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'
import {
  NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_CONCAVE_RPC_KEY,
  NEXT_PUBLIC_INFURA_ID,
} from './env.conf'

export const infuraId = NEXT_PUBLIC_INFURA_ID
export const concaveRPC = `https://rpc.concave.lol/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`
export const concaveWSS = `wss://rpc.concave.lol/ws/v1/${NEXT_PUBLIC_CONCAVE_RPC_KEY}`

const NoProviderKeyError = `Concave Provider
  You need to set at least one provider key in your .env file, examples in .env.example`

const getFallbackProviders = (chainId: number) => {
  const fallbackProviderConfigs = []

  if (NEXT_PUBLIC_CONCAVE_RPC_KEY && chainId === 1)
    fallbackProviderConfigs.push({
      provider: new providers.JsonRpcProvider(concaveRPC, chainId),
      priority: 1,
      weight: 2,
    })

  if (NEXT_PUBLIC_ALCHEMY_ID)
    fallbackProviderConfigs.push({
      provider: new providers.AlchemyProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID),
      priority: 2,
    })

  if (infuraId)
    fallbackProviderConfigs.push({
      provider: new providers.InfuraProvider(chainId, infuraId),
      priority: 2,
    })

  if (fallbackProviderConfigs.length === 0) throw NoProviderKeyError

  return fallbackProviderConfigs
}

export const concaveProvider = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider(getFallbackProviders(chainId), 1),
  )

export const concaveWSProvider = (chainId: number) => {
  if (NEXT_PUBLIC_CONCAVE_RPC_KEY) return new providers.WebSocketProvider(concaveWSS, chainId)
  if (infuraId) return new providers.InfuraWebSocketProvider(chainId, infuraId)
  if (NEXT_PUBLIC_ALCHEMY_ID)
    return new providers.AlchemyWebSocketProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID)
  throw NoProviderKeyError
}
