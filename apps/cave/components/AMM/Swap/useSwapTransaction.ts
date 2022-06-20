import { useState } from 'react'
import { RouterAbi, ROUTER_ADDRESS, Currency } from '@concave/core'
import { Router, TradeType, Trade } from '@concave/gemswap-sdk'
import { SwapSettings } from '../Swap/Settings'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount, useContract, useSigner } from 'wagmi'
import { toPercent } from 'utils/toPercent'

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
  { onTransactionSent }: { onTransactionSent?: (tx: TransactionResponse) => void },
) => {
  const networkId = useCurrentSupportedNetworkId()
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const routerContract = useContract({
    addressOrName: ROUTER_ADDRESS[networkId],
    contractInterface: RouterAbi,
    signerOrProvider: signer,
  })

  const [state, setState] = useState(initialState)
  const submit = async () => {
    setState({ ...initialState, trade, isWaitingForConfirmation: true })
    try {
      const { methodName, args, value } = Router.swapCallParameters(trade, {
        allowedSlippage: toPercent(settings.slippageTolerance),
        ttl: +settings.deadline * 60,
        feeOnTransfer: trade.tradeType === TradeType.EXACT_INPUT,
        recipient: recipient || account.address,
      })
      const tx: TransactionResponse = await routerContract[methodName](...args, { value })
      setState({ ...initialState, trade, isTransactionSent: true, data: tx })
      onTransactionSent(tx)
    } catch (error) {
      if (error.message === 'User rejected the transaction')
        return setState({ ...initialState, trade, isWaitingForConfirmation: false })

      setState({ ...initialState, trade, isError: true, error })
    }
  }

  return { submit, ...state }
}
