import { useState } from 'react'
import { RouterAbi, ROUTER_ADDRESS, Currency, CurrencyAmount, Percent } from '@concave/core'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useContract, UserRejectedRequestError, useSigner } from 'wagmi'
import { parseUnits } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
const currencyAmountToBigNumber = (currency: CurrencyAmount<Currency>) => {
  return parseUnits(currency.toFixed(currency.currency.decimals))
}

const getMinAmountParam = (amount: CurrencyAmount<Currency>) =>
  amount.multiply(new Percent(98, 100)) // amount -2%

const addLiquidity = async (
  tokenAmountA: CurrencyAmount<Currency>,
  tokenAmountB: CurrencyAmount<Currency>,
  routerContract: Contract,
  recipient: string,
  deadline = Math.round(Date.now() / 1000) + 60 * 30,
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
      currencyAmountToBigNumber(getMinAmountParam(notNativeAmount)),
      currencyAmountToBigNumber(getMinAmountParam(nativeAmount)),
      recipient,
      deadline,
      { value: nativeAmount.numerator.toString() },
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
    currencyAmountToBigNumber(getMinAmountParam(tokenAmountA)),
    currencyAmountToBigNumber(getMinAmountParam(tokenAmountB)),
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
  const { data: signer } = useSigner()
  const routerContract = useContract<Contract>({
    addressOrName: ROUTER_ADDRESS[networkId],
    // @ts-ignore
    contractInterface: RouterAbi,
    signerOrProvider: signer,
  })

  const [state, setState] = useState({
    isWaitingForConfirmation: false,
    isError: false,
    error: undefined,
    isTransactionSent: false,
    data: undefined,
  })

  const { registerTransaction } = useTransactionRegistry()

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

      registerTransaction(tx, {
        type: 'add liquidity',
        amount0: tokenAmountA.toString(),
        amount1: tokenAmountB.toString(),
        pairSymbol: `${tokenAmountA.currency.symbol}-${tokenAmountB.currency.symbol}`,
      })
    } catch (error) {
      if (error.message === 'User rejected the transaction')
        return setState((s) => ({ ...s, isWaitingForConfirmation: false }))

      setState((s) => ({ ...s, isError: true, error, isWaitingForConfirmation: false }))
    }
  }

  return { submit, ...state }
}
