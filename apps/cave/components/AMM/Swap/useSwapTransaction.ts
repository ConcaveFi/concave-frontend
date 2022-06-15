import { useState } from 'react'
import { RouterAbi, ROUTER_ADDRESS, Currency } from '@concave/core'
import { Router, TradeType, Trade } from '@concave/gemswap-sdk'
import { SwapSettings } from '../Swap/Settings'
import { Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useContract, useSigner } from 'wagmi'
import { useRecentTransactions } from 'hooks/useRecentTransactions'

const initialState = {
  isWaitingForConfirmation: false,
  isError: false,
  error: undefined,
  isTransactionSent: false,
  data: undefined,
  trade: undefined,
}

export const useSwapTransaction = (
  trade: Trade<Currency, Currency, TradeType>,
  settings: SwapSettings,
  recipient: string,
  { onTransactionSent }: { onTransactionSent?: (tx: Transaction) => void },
) => {
  const networkId = useCurrentSupportedNetworkId()
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const routerContract = useContract({
    addressOrName: ROUTER_ADDRESS[networkId],
    contractInterface: RouterAbi,
    signerOrProvider: signer,
  })

  const { addRecentTransaction } = useRecentTransactions()

  const [state, setState] = useState(initialState)
  const submit = async () => {
    setState({ ...initialState, trade, isWaitingForConfirmation: true })
    try {
      const { methodName, args, value } = Router.swapCallParameters(trade, {
        allowedSlippage: settings.slippageTolerance.percent,
        ttl: +settings.deadline * 60,
        feeOnTransfer: trade.tradeType === TradeType.EXACT_INPUT,
        recipient: recipient || account.address,
      })
      const tx = await routerContract[methodName](...args, { value })
      setState({ ...initialState, trade, isTransactionSent: true, data: tx })
      onTransactionSent(tx)
      addRecentTransaction({
        amount: +trade.inputAmount.toSignificant(3),
        amountTokenName: trade.inputAmount.currency.symbol,
        purchaseTokenName: trade.outputAmount.currency.symbol,
        purchase: +trade.outputAmount.toSignificant(3),
        transaction: tx,
        type: 'Swap',
        loading: true,
      })
    } catch (error) {
      if (error.message === 'User rejected the transaction')
        return setState({ ...initialState, trade, isWaitingForConfirmation: false })

      setState({ ...initialState, trade, isError: true, error })
    }
  }

  return { submit, ...state }
}
