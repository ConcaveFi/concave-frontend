import { useMemo } from 'react'
import { RouterAbi, ROUTER_ADDRESS, Currency } from '@concave/core'
import { Router, TradeType, Trade } from '@concave/gemswap-sdk'
import { SwapSettings } from '../Swap/Settings'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { toPercent } from 'utils/toPercent'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'

export const useSwapTransaction = (
  _trade: Trade<Currency, Currency, TradeType>,
  settings: SwapSettings,
  recipient: string,
  { onSuccess }: { onSuccess?: (tx: TransactionResponse) => void },
) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  /*
    temporary workaround for unknow issue with swapTokenForExactToken
    all trades are submited as exact input for now
  */
  const trade = useMemo(
    () => _trade.route && new Trade(_trade.route, _trade.inputAmount, TradeType.EXACT_INPUT),
    [_trade],
  )

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
      if (error.name === 'UserRejectedRequest') reset()
    },
  })

  return { trade, ...rest }
}
