import { providers } from 'ethers'
import { providers as multicallProvider } from '@0xsequence/multicall'
// https://github.com/ConcaveFi/concave-api/blob/develop/app/sbm/src/abi/index.ts

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_ID as string
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string
const concaveKey = process.env.NEXT_PUBLIC_CONCAVE_RPC_KEY

export const concaveRPC = 'https://eth.concave.lol/'

// export const concaveWSProvider = null;
export const concaveProvider = (chainid: number) => {
  // const alchemyapi_1 = new providers.JsonRpcProvider(
  //   `https://eth-mainnet.alchemyapi.io/v2/NmHDqgypFdC845u7uR9COcDeX9WaqKX8`, //${alchemy}`,
  // )
  const infura_1 = new providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${infuraId}`)

  // const pf = new providers.FallbackProvider(
  //   [
  //     // { provider: alchemyapi_1, priority: 1, weight: 1, stallTimeout: 100 },
  //     { provider: infura_1, priority: 1, weight: 1, stallTimeout: 100 },
  //   ],
  //   chainid,
  // )

  return infura_1
}

//   ethers contract to use
// const providerFallback = customProviderFallback(1);
// const contractInstance = new ethers.Contract(
//   address,
//   contractABI,
//   providerFallback
// );

// const decimals = await contractInstance.decimals();

export const concaveProvider2 = (chainId: number) =>
  new multicallProvider.MulticallProvider(
    new providers.FallbackProvider([
      providers.getDefaultProvider(chainId, { alchemy, etherscan, infuraId }),
    ]),
  )

export const concaveWSProvider = (chainId: number) =>
  new providers.InfuraWebSocketProvider(chainId, infuraId)
