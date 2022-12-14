import { Currency, CurrencyAmount, Percent, RouterAbi, ROUTER_ADDRESS } from '@concave/core'
import { useErrorModal } from 'contexts/ErrorModal'
import { BigNumber, Contract } from 'ethers'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useState } from 'react'
import { useContract, useSigner } from 'wagmi'

const currencyAmountToBigNumber = (amount: CurrencyAmount<Currency>) => {
  return BigNumber.from(amount.quotient.toString())
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
    contractInterface: RouterAbi,
    signerOrProvider: signer,
  })
  const errorModal = useErrorModal();
  return useTransaction(async () => {
    const to = recipient || (await signer.getAddress())
    return await addLiquidity(tokenAmountA, tokenAmountB, routerContract, to)
  }, {
    onError: errorModal.onOpen,
    meta: {
      type: 'add liquidity',
      amount0: tokenAmountA.toString(),
      amount1: tokenAmountB.toString(),
      pairSymbol: `${tokenAmountA.currency.symbol}-${tokenAmountB.currency.symbol}`,
    }
  })
}
