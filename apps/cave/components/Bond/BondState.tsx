import { useState, useMemo } from 'react'
import { chain, useNetwork, useBalance, useAccount } from 'wagmi'
import { useQuery } from 'react-query'
import { BigNumberish, Contract } from 'ethers'
import { DAI, CNV } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/BondingAddress'
import { BOND_ABI } from '../../contracts/BondABI'
import { Token, Currency } from 'gemswap-sdk'

const useCurrencyBalance = (currency: Currency, userAddress: string) =>
  useBalance({
    addressOrName: userAddress,
    token: currency?.isToken && currency?.address,
    formatUnits: currency?.decimals,
    skip: !currency || !userAddress,
  })

export const useCurrentSupportedNetworkId = () => {
  const [{ data }] = useNetwork()
  const chainId = data?.chain?.id === chain.ropsten.id
  return chainId ? chain.ropsten.id : chain.mainnet.id
}

export const useBondTransaction = (recipient: string) => {
  const networkId = useCurrentSupportedNetworkId()
  const [bond, estimateBondGas] = useMemo(() => {
    const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI)
    return [
      // { args, overrides: { value } }
      () => bondingContract['bond'](),
      () => bondingContract.estimateGas[''](),
    ]
  }, [networkId])

  const { refetch, ...bondTransaction } = useQuery(['bond', recipient], bond, {
    enabled: false,
  })

  return [estimateBondGas, bondTransaction, refetch]
}

export const useBondState = () => {
  const [{ data: account }] = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const [currencyIn, setCurrencyIn] = useState<Token>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Token>(CNV[networkId])

  const [recipient, setRecipient] = useState<string>('')
  const [exactValue, setExactValue] = useState<BigNumberish>(0)
  const balance = useCurrencyBalance(currencyIn, account?.address)
  const userAddress = account?.address
  const updateField = () => (amount) => {
    setExactValue(amount)
  }

  return useMemo(
    () => ({
      currencyIn,
      currencyOut,
      recipient,
      exactValue,
      setRecipient,
      userAddress,
      balance,
    }),
    [balance, currencyIn, exactValue, recipient, userAddress],
  )
}
