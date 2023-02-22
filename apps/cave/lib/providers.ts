import { providers as multicallProvider } from '@0xsequence/multicall'
import { ChainId } from '@concave/core'
import { providers } from 'ethers'
import { mainnet, localhost } from 'wagmi/chains'
import {
  NEXT_PUBLIC_ALCHEMY_ID,
  NEXT_PUBLIC_CONCAVE_RPC_KEY,
  NEXT_PUBLIC_INFURA_ID,
} from './env.conf'

/**
 * TODO: review it @gregs
 */
export const concaveProviderConfig = {
  rpc: `https://mainnet.infura.io/v3/${NEXT_PUBLIC_INFURA_ID}`,
  wss: `wss://mainnet.infura.io/ws/v3/${NEXT_PUBLIC_INFURA_ID}`,
}

const NoProviderKeyError = `Concave Provider
  You need to set at least one provider key in your .env file, examples in .env.example`

const stallTimeout = 500 // timeout in milliseconds after which another provider will be attempted.
const getFallbackProvider = (chainId: number) => {
  const providerConfigs = []
  /**
   * TODO: review it @gregs
   */
  if (NEXT_PUBLIC_CONCAVE_RPC_KEY && chainId === mainnet.id)
    providerConfigs.push({
      provider: new providers.InfuraProvider(chainId, NEXT_PUBLIC_INFURA_ID),
      priority: 2,
      stallTimeout,
    })

  if (NEXT_PUBLIC_INFURA_ID && chainId !== localhost.id)
    providerConfigs.push({
      provider: new providers.InfuraProvider(chainId, NEXT_PUBLIC_INFURA_ID),
      priority: 0,
      stallTimeout,
    })

  if (NEXT_PUBLIC_ALCHEMY_ID && chainId !== localhost.id)
    providerConfigs.push({
      provider: new providers.AlchemyProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID),
      priority: 1,
      stallTimeout,
    })

  if (chainId === localhost.id) {
    providerConfigs.push({
      provider: new providers.JsonRpcProvider(localhost.rpcUrls.default[0], chainId),
      priority: 1,
      stallTimeout,
    })
  }
  if (providerConfigs.length === 0) throw NoProviderKeyError

  return new providers.FallbackProvider(providerConfigs, 1)
}

const singletonProvider: { [key: number]: multicallProvider.MulticallProvider } = {}

export const concaveProvider = (chainId: number) => {
  if (singletonProvider[chainId]) return singletonProvider[chainId]
  const f = getFallbackProvider(chainId)
  const p = new multicallProvider.MulticallProvider(f)
  p._network = f._network
  singletonProvider[chainId] = p
  return singletonProvider[chainId]
}

export const concaveWSProvider = (chainId: number) => {
  if (NEXT_PUBLIC_CONCAVE_RPC_KEY)
    return new providers.WebSocketProvider(concaveProviderConfig.wss, chainId)
  if (NEXT_PUBLIC_INFURA_ID)
    return new providers.InfuraWebSocketProvider(chainId, NEXT_PUBLIC_INFURA_ID)
  if (NEXT_PUBLIC_ALCHEMY_ID)
    return new providers.AlchemyWebSocketProvider(chainId, NEXT_PUBLIC_ALCHEMY_ID)
  throw NoProviderKeyError
}
