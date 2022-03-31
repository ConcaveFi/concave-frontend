import { useState } from 'react'
import { chain } from 'wagmi'
import { useToken, WrapperTokenInfo } from '../components/Swap/useSwap'

export const usePosition = ({
  chainId = chain.ropsten.id,
  userAddress,
  symbolA,
  symbolB,
  liquidityAddress,
}) => {
  console.log(symbolA)
  const [wrapperTokenA, setTokenA] = useToken({ userAddressOrName: userAddress, symbol: symbolA })
  const [wrapperTokenB, setTokenB] = useToken({ userAddressOrName: userAddress, symbol: symbolB })
  const [amountPooledA, setAmontPooledA] = useState(100)
  const [amountPooledB, setAmontPooledB] = useState(100)
  const [yourPoolShare, setYourPoolShare] = useState(2.79)
  return [
    {
      wrapperTokenA,
      wrapperTokenB,
      amountPooledA,
      amountPooledB,
      yourPoolShare,
    },
  ] as const
}
export type UseAddLiquidityData = {
  wrapperTokenA: WrapperTokenInfo
  wrapperTokenB: WrapperTokenInfo
  amountADesired: number
  amountBDesired: number
  userAddress: string
}
