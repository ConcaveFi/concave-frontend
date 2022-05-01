import { useState } from 'react'
import { RouterABI, ROUTER_ADDRESS, Currency, CurrencyAmount } from 'gemswap-sdk'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useContract, useSigner } from 'wagmi'
import { currencyAmountToBigNumber } from 'lib/util'

const getMinAmountParam = (amount: CurrencyAmount<Currency>) =>
  currencyAmountToBigNumber(amount).div(100).mul(98) // amount -2%

const addLiquidity = async (
  tokenAmountA: CurrencyAmount<Currency>,
  tokenAmountB: CurrencyAmount<Currency>,
  routerContract: Contract,
  recipient: string,
  deadline = Math.round(Date.now() / 1000) * 60 * 30,
) => {
  /*
    Add with ETH
   */
  if (tokenAmountA.currency.isNative || tokenAmountB.currency.isNative) {
    const [notNativeAmount, nativeAmount] = tokenAmountA.currency.isNative
      ? [tokenAmountB, tokenAmountA]
      : [tokenAmountA, tokenAmountB]

    return routerContract.addLiquidityETH(
      notNativeAmount.currency.wrapped.address,
      currencyAmountToBigNumber(notNativeAmount),
      getMinAmountParam(notNativeAmount),
      getMinAmountParam(nativeAmount),
      recipient,
      deadline,
      { value: currencyAmountToBigNumber(nativeAmount.wrapped) },
    )
  }

  /*
    Add both ERC20s
  */
  return routerContract.addLiquidity(
    tokenAmountA.currency.wrapped.address,
    tokenAmountB.currency.wrapped.address,
    currencyAmountToBigNumber(tokenAmountA),
    currencyAmountToBigNumber(tokenAmountB),
    getMinAmountParam(tokenAmountA),
    getMinAmountParam(tokenAmountB),
    recipient,
    deadline,
  )
}

export const useAddLiquidityTransaction = (
  tokenAmountA: CurrencyAmount<Currency>,
  tokenAmountB: CurrencyAmount<Currency>,
  recipient?: string,
) => {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: signer }] = useSigner()
  const routerContract = useContract<Contract>({
    addressOrName: ROUTER_ADDRESS[networkId],
    contractInterface: RouterABI,
    signerOrProvider: signer,
  })

  const [state, setState] = useState({
    isWaitingForConfirmation: false,
    isError: false,
    error: undefined,
    isTransactionSent: false,
    data: undefined,
  })
  const submit = async () => {
    setState((s) => ({ ...s, isWaitingForConfirmation: true }))
    try {
      const to = recipient || (await signer.getAddress())
      const tx = await addLiquidity(tokenAmountA, tokenAmountB, routerContract, to)
      setState((s) => ({
        ...s,
        isTransactionSent: true,
        data: tx,
        isWaitingForConfirmation: false,
      }))
    } catch (error) {
      setState((s) => ({ ...s, isError: true, error, isWaitingForConfirmation: false }))
    }
  }

  return { submit, ...state }
}
