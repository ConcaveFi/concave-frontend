import { useState, useMemo } from 'react'
import { chain, useNetwork, useBalance } from 'wagmi'
import { BigNumberish, Contract, ethers } from 'ethers'
import { DAI, CNV } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { BOND_ABI } from '../../contracts/Bond/BondABI'
import { Token, Currency } from 'gemswap-sdk'
import { useAuth } from 'contexts/AuthContext'

// testing only, flip to prod
let providers = new ethers.providers.InfuraProvider("ropsten", '3270f483eb9e484ba6d9f472557f4350');

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

export const useBondGetAmountOut = async (quoteAddress: string, decimals: number, networkId: number, input: string) => {
    const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
    const ROPSTEN_CNV = '0x2b8e79cbd58418ce9aeb720baf6b93825b93ef1f'
    // pass decimals argument where 18 is hardcoded
    const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
    const amountOut = await bondingContract.getAmountOut(ROPSTEN_CNV, formattedInput)
    const ethValue = ethers.utils.formatEther(amountOut);
    const cleanedOutput = parseFloat(ethValue).toFixed(6)
    return cleanedOutput
}

export const useBondState = () => {
  const { user, isConnected } = useAuth()
  const networkId = useCurrentSupportedNetworkId()
  const [currencyIn, setCurrencyIn] = useState<Token>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Token>(CNV[networkId])
  const [recipient, setRecipient] = useState<string>('')
  const [exactValue, setExactValue] = useState<BigNumberish>(0)
  const balance = useCurrencyBalance(currencyIn, user.address)
  const userAddress = user.address

  return useMemo(
    () => ({
      currencyIn,
      currencyOut,
      recipient,
      exactValue,
      setRecipient,
      userAddress,
      isConnected,
      balance,
      networkId
    }),
    [balance, currencyIn, exactValue, isConnected, recipient, userAddress],
  )
}
