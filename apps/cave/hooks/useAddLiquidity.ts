// import { BigNumber, ethers } from 'ethers'
// import { parseUnits } from 'ethers/lib/utils'
// import { BigintIsh } from 'gemswap-sdk'
// import { ContractAddress } from 'lib/contractAddress'
// import { contractABI } from 'lib/contractoABI'
// import { concaveProvider } from 'lib/providers'
// import { useEffect, useState } from 'react'
// import { chain, useSigner, useWaitForTransaction } from 'wagmi'
// // import { useToken, WrapperTokenInfo } from '../components/Swap/useSwap'

export const useAddLiquidity = (selectedChain, userAddress) => {}
// export const useAddLiquidity = (selectedChain = chain.ropsten, userAddress) => {
//   const [wrapperTokenA, setTokenA] = useToken({
//     userAddressOrName: userAddress,
//     symbol: '',
//     selectedChain,
//   })
//   const [amountADesired, setAmountADesired] = useState<BigNumber>(null)

//   const [wrapperTokenB, setTokenB] = useToken({
//     userAddressOrName: userAddress,
//     symbol: '',
//     selectedChain,
//   })
//   const [amountBDesired, setAmountBDesired] = useState<BigNumber>(null)
//   const [{ data, error, loading }, getSigner] = useSigner()
//   const [hash, setHash] = useState<string>(null)
//   const contractInstance = new ethers.Contract(
//     ContractAddress[selectedChain.id],
//     contractABI,
//     concaveProvider(selectedChain.id),
//   )

//   const clear = () => {
//     setTokenA(null)
//     setTokenB(null)
//     setAmountADesired(null)
//     setAmountBDesired(null)
//     setHash('')
//   }
//   const call = async () => {
//     const contractSigner = contractInstance.connect(data)
//     const to = userAddress
//     const provider = concaveProvider(chain.ropsten.id)
//     const currentBlockNumber = await provider.getBlockNumber()
//     const { timestamp } = await provider.getBlock(currentBlockNumber)
//     const deadLine = timestamp + 86400
//     const tokenA = wrapperTokenA.token.address
//     const tokenB = wrapperTokenB.token.address
//     contractSigner
//       .addLiquidity(
//         tokenA,
//         tokenB,
//         parseUnits(`${amountADesired}`, wrapperTokenA.token.decimals),
//         parseUnits(`${amountBDesired}`, wrapperTokenB.token.decimals),
//         parseUnits(`0`, wrapperTokenA.token.decimals),
//         parseUnits(`0`, wrapperTokenB.token.decimals),
//         to,
//         deadLine,
//         {
//           gasLimit: 500000,
//         },
//       )
//       .then((r) => {
//         setHash(r.hash)
//         return r
//       })
//   }

//   return [
//     {
//       wrapperTokenA,
//       wrapperTokenB,
//       amountADesired,
//       amountBDesired,
//       userAddress,
//       hash,
//     },
//     {
//       setTokenA,
//       setTokenB,
//       setAmountADesired,
//       setAmountBDesired,
//     },
//     call,
//     clear,
//   ] as const
// }
// export type UseAddLiquidityData = {
//   wrapperTokenA: WrapperTokenInfo
//   wrapperTokenB: WrapperTokenInfo
//   amountADesired: BigNumber
//   amountBDesired: BigNumber
//   userAddress: string
// }
