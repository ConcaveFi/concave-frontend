import { CNV, DAI } from '@concave/gemswap-sdk'
import { position } from '@concave/ui'
import { Contract, ethers, utils } from 'ethers'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider as providers, rawProvider } from 'lib/providers'
import { useMemo, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { BOND_ABI } from '../../contracts/Bond/BondABI'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { ROPSTEN_DAI_ABI } from '../../contracts/Bond/ROPSTEN_DAI_ABI'
import { BondSettings } from './Settings'

export const getBondAmountOut = async (
  quoteAddress: string,
  decimals: number,
  networkId: number,
  input: string,
) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers(networkId))
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  // pass decimals argument where 18 is hardcoded
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const amountOut = await bondingContract.getAmountOut(ROPSTEN_DAI, formattedInput)
  console.log(amountOut)
  const ethValue = ethers.utils.formatEther(amountOut)
  const cleanedOutput = parseFloat(ethValue).toFixed(6)
  return cleanedOutput
}

export const getBondTermLength = async (networkId: number) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers(networkId))
  const termLength = await bondingContract.term()
  const formattedTermLength = termLength.toString()
  return formattedTermLength / 60 / 60 / 24
}

export const getBondSpotPrice = async (networkId: number, tokenAddress: string) => {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers(networkId))
  const ROPSTEN_DAI = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const spotPrice = await bondingContract.getSpotPrice(ROPSTEN_DAI)
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
  const ROPSTEN_DAI_ADDRESS = '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4'
  const ROPSTEN_DAI_CONTRACT = new ethers.Contract(ROPSTEN_DAI_ADDRESS, ROPSTEN_DAI_ABI, signer)
  const currentAllowance = await ROPSTEN_DAI_CONTRACT.allowance(address, BOND_ADDRESS[networkId])
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, signer)
  const minOutput = +(+amountOut - (+settings.slippageTolerance.value / 100) * +amountOut).toFixed(
    2,
  )
  const formattedInput = ethers.utils.parseUnits(input.toString(), 18)
  const formattedMinOutput = ethers.utils.parseUnits(minOutput.toString(), 18)
  const formattedAllowance = ethers.utils.formatEther(currentAllowance)
  const intParseInput = +input
  const intParseAllowance = +formattedAllowance
  if (intParseInput > intParseAllowance) {
    await ROPSTEN_DAI_CONTRACT.approve('0x5C2bDbdb14E2f6b6A443B0f2FfF34F269e5DE81d', formattedInput)
  } else {
    const estimatedGas = await bondingContract.estimateGas.purchaseBond(
      address,
      ROPSTEN_DAI_ADDRESS,
      formattedInput,
      formattedMinOutput,
    )
    await bondingContract.purchaseBond(
      address,
      ROPSTEN_DAI_ADDRESS,
      formattedInput,
      formattedMinOutput,
      {
        gasLimit: estimatedGas,
      },
    )
  }
  return
}

export async function getCurrentBlockTimestamp() {
  const getBlock = await rawProvider.getBlockNumber()
  const timestamp = (await rawProvider.getBlock(getBlock)).timestamp
  return timestamp
}

export async function redeemBondBatch(
  networkId: number,
  positionIDArray: Array<any>,
  address: string,
  signer: ethers.Signer,
) {
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, signer)
  const estimatedGas = bondingContract.estimateGas.redeemBondBatch(address, positionIDArray)
  await bondingContract.redeemBondBatch(address, positionIDArray, {
    gasLimit: estimatedGas,
  })
  return
}

export const getUserBondPositions = async (
  networkId: number,
  address: string,
  currentBlockTimestamp: number,
) => {
  let batchRedeemArray = []
  let totalPending = 0
  let totalOwed = 0
  let rawOwed = 0
  let oldest = 0
  let oldestCreationTimestamp = 0
  let claimed = false
  let redeemable = 0
  const bondingContract = new Contract(BOND_ADDRESS[networkId], BOND_ABI, providers(networkId))
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
    redeemable += positionData.owed * elapsed - positionData.redeemed
    totalPending += +(+utils.formatEther(positionData.redeemed))
    totalOwed += +(+utils.formatEther(positionData.owed))
  }
  const fullyVestedTimestamp = oldest * 1000 + 86400000
  const parseOldest = new Date(fullyVestedTimestamp).toString().slice(4, 21)
  const parseRedeemable = redeemable < 0 ? 0 : +utils.formatEther(redeemable.toString())
  if (totalPending === totalOwed) claimed = true
  return { parseOldest, totalOwed, totalPending, batchRedeemArray, claimed, parseRedeemable }
}

export const useBondState = () => {
  const [{ data: account }] = useAccount()
  const [{ data: signer }] = useSigner()
  const [recipient, setRecipient] = useState<string>('')
  const networkId = useCurrentSupportedNetworkId()
  const currencyIn = DAI[networkId]
  const currencyOut = CNV[networkId]
  const balance = useCurrencyBalance(currencyIn, { watch: true })
  const userAddress = account?.address

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
