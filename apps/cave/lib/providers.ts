import { providers } from 'ethers'

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const concaveKey = process.env.NEXT_PUBLIC_CONCAVE_RPC_KEY

export const concaveRPC = 'https://eth.concave.lol/'

export const concaveProvider = (chainId: number) =>
  new providers.FallbackProvider([
    new providers.JsonRpcProvider(
      { url: concaveRPC, headers: { 'x-api-key': concaveKey } },
      chainId,
    ),
    providers.getDefaultProvider(chainId, { alchemy, etherscan, infuraId }),
  ])

export const concaveWSProvider = (chainId: number) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)
