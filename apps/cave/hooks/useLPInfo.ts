import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { liquidityContractABI } from 'lib/liquidityContractABI'
import { concaveProvider2 } from 'lib/providers'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { chain } from 'wagmi'

export const useLPInfo = (chainId = chain.mainnet.id, LPAddress: string) => {
  const contractInstance = useMemo(() => {
    return new ethers.Contract(LPAddress, liquidityContractABI, concaveProvider2(chainId))
  }, [LPAddress, chainId])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [amount0, setAmount0] = useState('0')
  const [amount1, setAmount1] = useState('0')
  const [valueInUSD, setValueUSD] = useState(0)

  const [token1Price, setToken1Price] = useState(1) // Mock price

  useEffect(() => {
    setLoading(true)
    Promise.all([
      contractInstance.token1().then((address) => {}),
      contractInstance.getReserves().then((reserves) => {
        setAmount0(formatUnits(reserves._baseReserves.toString(), 18))
        setAmount1(formatUnits(reserves._quoteReserves.toString(), 18))
        setValueUSD(+formatUnits(reserves._quoteReserves.toString(), 18) * token1Price * 2)
      }),
    ]).then(() => setLoading(false))
  }, [contractInstance, token1Price])

  return [{ amount0, amount1, valueInUSD }, isLoading] as const
}
