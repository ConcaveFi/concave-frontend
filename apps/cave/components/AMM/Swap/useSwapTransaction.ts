import { Currency, RouterAbi, ROUTER_ADDRESS } from '@concave/core'
import { Router, Trade, TradeType } from '@concave/gemswap-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useMemo } from 'react'
import { toPercent } from 'utils/toPercent'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useSwapSettings } from '../Swap/Settings'

export const useSwapTransaction = (
  _trade: Trade<Currency, Currency, TradeType>,
  recipient: string,
  { onSuccess }: { onSuccess?: (tx: TransactionResponse) => void },
) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { settings } = useSwapSettings()

  /*
    temporary workaround for unknow issue with swapTokenForExactToken
    all trades are submited as exact input for now
  */
  const trade = useMemo(() => {
    if (_trade?.route) return undefined
    try {
      return new Trade(_trade.route, _trade.inputAmount, TradeType.EXACT_INPUT)
    } catch {
      return undefined
    }
  }, [_trade])

  const swapParams = useMemo(() => {
    if (trade && address)
      return Router.swapCallParameters(trade, {
        allowedSlippage: toPercent(settings.slippageTolerance),
        ttl: +settings.deadline * 60,
        feeOnTransfer: trade.tradeType === TradeType.EXACT_INPUT,
        recipient: recipient || address,
      })
  }, [trade, settings, recipient, address])

  const { registerTransaction } = useTransactionRegistry()

  const { reset, ...rest } = useContractWrite({
    addressOrName: ROUTER_ADDRESS[chain?.id],
    contractInterface: RouterAbi,
    functionName: swapParams?.methodName,
    args: swapParams?.args,
    overrides: { value: swapParams?.value },
    onSuccess: (tx) => {
      onSuccess?.(tx)
      registerTransaction(tx, {
        type: 'swap',
        amountIn: trade.inputAmount.toString(),
        amountOut: trade.outputAmount.toString(),
      })
    },
    onError: (error) => {
      if (error.name === 'UserRejectedRequestError') reset()
    },
  })

  return { trade, ...rest }
}
