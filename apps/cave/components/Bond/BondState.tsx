import { useState, useMemo } from 'react'
import { chain, useNetwork, useBalance, useContractWrite, useAccount, useSigner } from 'wagmi'
import { BigNumberish, Contract, ethers } from 'ethers'
import { DAI, CNV } from 'gemswap-sdk'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { BOND_ABI } from '../../contracts/Bond/BondABI'
import { ROPSTEN_DAI_ABI } from '../../contracts/Bond/ROPSTEN_DAI_ABI'
import { Token, Currency } from 'gemswap-sdk'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'

// testing only, flip to prod
let providers = new ethers.providers.InfuraProvider('ropsten', '5ad069733a1a48a897180e66a5fb8846')

const useCurrencyBalance = (currency: Currency, userAddress: string) =>
  useBalance({
    addressOrName: userAddress,
    token: currency?.isToken && currency?.address,
    formatUnits: currency?.decimals,
    skip: !currency || !userAddress,
  })

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

export const getBondSpotPrice = async (networkId: number, tokenAddress: string) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const spotPrice = await bondingContract.getSpotPrice(ROPSTEN_DAI)
  const formatted = ethers.utils.formatEther(spotPrice)
  return formatted
}

export const purchaseBond = async (
  networkId: number,
  input: string,
  getAmountOut: string,
  address: string,
  signer: ethers.Signer,
) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers)
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const formattedMinOutput = ethers.utils.parseUnits('1', 18)
  const ROPSTEN_DAI_ADDRESS = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const ROPSTEN_DAI_CONTRACT = new ethers.Contract(ROPSTEN_DAI_ADDRESS, ROPSTEN_DAI_ABI, signer)
  const currentAllowance = await ROPSTEN_DAI_CONTRACT.allowance(address, BOND_ADDRESS[networkId])
  const formattedAllowance = ethers.utils.formatEther(currentAllowance)
  const intParseInput = +input
  const intParseAllowance = +formattedAllowance
  if (intParseInput > intParseAllowance) {
    await ROPSTEN_DAI_CONTRACT.approve('0xE9Ffe05f55697A4D8A95BB046E5A8b150A49687e', formattedInput)
  }
  // console.log(bondingContract.purchaseBond(address, ROPSTEN_DAI, formattedInput, formattedMinOutput)

  // const formatted = ethers.utils.formatEther(spotPrice)
  // console.log(formatted)
  // return formatted
}

// export const redeemBond = async (
//   quoteAddress: string,
//   decimals: number,
//   networkId: number,
//   input: string,
// ) => {

// }

export const useBondState = () => {
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()

  const networkId = useCurrentSupportedNetworkId()
  const [currencyIn, setCurrencyIn] = useState<Token>(DAI[networkId])
  const [currencyOut, setCurrencyOut] = useState<Token>(CNV[networkId])
  const [recipient, setRecipient] = useState<string>('')
  const [exactValue, setExactValue] = useState<BigNumberish>(0)
  const balance = useCurrencyBalance(currencyIn, account?.address)
  const userAddress = account?.address
  // const [swapTransaction, swap] = useContractWrite({
  //   addressOrName: ROUTER_CONTRACT[isRopsten ? chain.ropsten.id : chain.mainnet.id],
  //   contractInterface: RouterABI,
  // })
  return useMemo(
    () => ({
      signer,
      currencyIn,
      currencyOut,
      recipient,
      exactValue,
      setRecipient,
      userAddress,
      balance,
      networkId,
    }),
    [balance, currencyIn, exactValue, recipient, userAddress, signer],
  )
}
