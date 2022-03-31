import { providers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
export const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const concaveKey = process.env.NEXT_PUBLIC_CONCAVE_RPC_KEY

export const concaveRPC = 'https://eth.concave.lol/'

// export const concaveProvider = (chainid: number) => {
//   // const alchemyapi_1 = new providers.JsonRpcProvider(
//   //   `https://eth-mainnet.alchemyapi.io/v2/${alchemy}`, //${alchemy}`,
//   // )
//   const infura_1 = new providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${infuraId}`)
//   return infura_1
// }

export const concaveProvider2 = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider([
      providers.getDefaultProvider(chainId, { alchemy, etherscan, infuraId }),
    ]),
  )
export const concaveProvider = concaveProvider2
export const concaveWSProvider = (chainId: number) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)
