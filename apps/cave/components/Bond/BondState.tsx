import { BondAbi, BOND_ADDRESS, CNV, DAI, DAI_ADDRESS, Token } from '@concave/core'
import { Contract, ethers, utils } from 'ethers'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'contexts/Wagmi/WagmiContext'
import { useMemo, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { BondSettings } from './Settings'

export const getBondAmountOut = async (
  quoteAddress: string,
  decimals: number,
  chainId: number,
  input: string,
) => {
  const bondingContract = new Contract(BOND_ADDRESS[chainId], BondAbi, concaveProvider({ chainId }))
  const DAI = DAI_ADDRESS[chainId]
  // pass decimals argument where 18 is hardcoded
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const amountOut = await bondingContract.getAmountOut(DAI, formattedInput)
  const ethValue = +ethers.utils.formatEther(amountOut)

  const cleanedOutput = ethValue.toFixed(4)

  return cleanedOutput
}

export const getBondTermLength = async (chainId: number) => {
  const bondingContract = new Contract(BOND_ADDRESS[chainId], BondAbi, concaveProvider({ chainId }))
  const termLength = await bondingContract.term()
  const formattedTermLength = termLength.toString()
  return formattedTermLength / 60 / 60 / 24
}

export const getBondSpotPrice = async (chainId: number) => {
  const bondingContract = new Contract(BOND_ADDRESS[chainId], BondAbi, concaveProvider({ chainId }))
  const DAI = DAI_ADDRESS[chainId]
  const spotPrice = await bondingContract.getSpotPrice(DAI)
  const formatted = ethers.utils.formatEther(spotPrice)
  return formatted
}

export const purchaseBond = async (
  networkId: number,
  input: string,
  address: string,
  signer: ethers.Signer,
  settings: BondSettings,
  amountOut: string,
) => {
  const DAI = DAI_ADDRESS[networkId]
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BondAbi, signer)
  const minOutput = +(+amountOut - (+settings.slippageTolerance / 100) * +amountOut).toFixed(2)
  1
  const formattedInput = utils.parseUnits(input.toString(), 18)
  const formattedMinOutput = utils.parseUnits(minOutput.toString(), 18)
  const estimatedGas = await bondingContract.estimateGas.purchaseBond(
    address,
    DAI,
    formattedInput,
    formattedMinOutput,
  )
  return await bondingContract.purchaseBond(address, DAI, formattedInput, formattedMinOutput, {
    gasLimit: estimatedGas,
  })
}

export async function getCurrentBlockTimestamp(chainId: number) {
  try {
    const provider = concaveProvider({ chainId })
    const getBlock = await provider.getBlockNumber()
    const timestamp = (await provider.getBlock(getBlock)).timestamp
    return timestamp
  } catch (e) {
    return
  }
}

export async function redeemBondBatch(
  networkId: number,
  positionIDArray: Array<any>,
  address: string,
  signer: ethers.Signer,
) {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BondAbi, signer)
  const estimatedGas = bondingContract.estimateGas.redeemBondBatch(address, positionIDArray)
  return await bondingContract.redeemBondBatch(address, positionIDArray, {
    gasLimit: estimatedGas,
  })
}

export type ReturnBondPositions = {
  parseOldest: string
  totalOwed: number
  totalPending: number
  batchRedeemArray: any[]
  claimed: boolean
  parsRedeemable: number
  address: string
}

export const getUserBondPositions = async (
  chainId: number,
  address: string,
  currentBlockTimestamp: number,
  currentRedeemable?: number,
) => {
  let batchRedeemArray = []
  let totalPending = 0
  let totalOwed = 0
  let rawOwed = 0
  let oldest = 0
  let oldestCreationTimestamp = 0
  let claimed = false
  let redeemable = currentRedeemable || 0
  const bondingContract = new Contract(BOND_ADDRESS[chainId], BondAbi, concaveProvider({ chainId }))
  const getUserPositionsLength = await bondingContract.getUserPositionCount(address)
  const termData = await bondingContract.term()
  for (let i = 0; i < +getUserPositionsLength; i++) {
    batchRedeemArray.push(+i)
    const positionData = await bondingContract.positions(address, i)
    rawOwed += +positionData.owed
    if (i === getUserPositionsLength - 1) {
      oldest += +positionData.creation
      oldestCreationTimestamp += +positionData.creation
    }
    let length = currentBlockTimestamp - positionData.creation
    let elapsed = length / termData > 1 ? 1 : length / termData
    redeemable +=
      Math.sign(positionData.owed * elapsed - positionData.redeemed) === 1
        ? positionData.owed * elapsed - positionData.redeemed
        : 0
    totalPending += +(+utils.formatEther(positionData.redeemed))
    totalOwed += +(+utils.formatEther(positionData.owed))
  }
  const fullyVestedTimestamp = oldest * 1000 + 432000000
  const parseOldest = new Date(fullyVestedTimestamp).toString().slice(4, 21)
  const parsRedeemable = Math.sign(redeemable) === -1 ? 0 : +redeemable
  if (totalPending === totalOwed) claimed = true
  return {
    parseOldest,
    totalOwed,
    totalPending,
    batchRedeemArray,
    claimed,
    parsRedeemable,
    address,
  }
}

export const useBondState = () => {
  const { address: userAddress } = useAccount()
  const { data: signer } = useSigner()
  const [recipient, setRecipient] = useState<string>('')
  const networkId = useCurrentSupportedNetworkId()
  const currencyIn: Token = DAI[networkId]
  const currencyOut: Token = CNV[networkId]
  const balance = useCurrencyBalance(currencyIn, { watch: true })

  return useMemo(
    () => ({
      signer,
      currencyIn,
      currencyOut,
      recipient,
      setRecipient,
      userAddress,
      balance,
      networkId,
    }),
    [signer, currencyIn, currencyOut, recipient, userAddress, balance, networkId],
  )
}
