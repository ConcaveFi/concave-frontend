import { useState, useMemo } from 'react'
import { chain, useNetwork, useBalance, useContractWrite } from 'wagmi'
import { BigNumberish, Contract, ethers } from 'ethers'
import { DAI, CNV } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { BOND_ABI } from '../../contracts/Bond/BondABI'
import { Token, Currency } from 'gemswap-sdk'
import { useAuth } from 'contexts/AuthContext'

// testing only, flip to prod
let providers = new ethers.providers.InfuraProvider('ropsten', '3270f483eb9e484ba6d9f472557f4350')

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

export const useBondGetAmountOut = async (
  quoteAddress: string,
  decimals: number,
  networkId: number,
  input: string,
) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  // pass decimals argument where 18 is hardcoded
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const amountOut = await bondingContract.getAmountOut(ROPSTEN_DAI, formattedInput)
  const ethValue = ethers.utils.formatEther(amountOut)
  const cleanedOutput = parseFloat(ethValue).toFixed(6)
  return cleanedOutput
}

export const useBondGetTermLength = async (networkId: number) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const termLength = await bondingContract.term()
  const formattedTermLength = termLength.toString()
  return formattedTermLength / 60 / 60 / 24
}

// export const useBondCalculateROI = async (
//   quoteAddress: string,
//   decimals: number,
//   networkId: number,
//   input: string,
// ) => {

// }

// export const purchaseBond = async (
//   quoteAddress: string,
//   decimals: number,
//   networkId: number,
//   input: string,
// ) => {

// }

// export const redeemBond = async (
//   quoteAddress: string,
//   decimals: number,
//   networkId: number,
//   input: string,
// ) => {

// }

export const useBondState = () => {
  const { user, isConnected } = useAuth()
  const networkId = useCurrentSupportedNetworkId()
  const [currencyIn, setCurrencyIn] = useState<Token>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Token>(CNV[networkId])
  const [recipient, setRecipient] = useState<string>('')
  const [exactValue, setExactValue] = useState<BigNumberish>(0)
  const balance = useCurrencyBalance(currencyIn, user.address)
  const userAddress = user.address
  // const [swapTransaction, swap] = useContractWrite({
  //   addressOrName: ROUTER_CONTRACT[isRopsten ? chain.ropsten.id : chain.mainnet.id],
  //   contractInterface: RouterABI,
  // })
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
      networkId,
    }),
    [balance, currencyIn, exactValue, isConnected, recipient, userAddress],
  )
}
