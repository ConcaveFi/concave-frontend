import { Currency, RouterAbi, ROUTER_ADDRESS } from '@concave/core'
import { Router, Trade, TradeType } from '@concave/gemswap-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { isAddress } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { UsePermiReturn } from 'hooks/usePermit'
import { useMemo } from 'react'
import { toPercent } from 'utils/toPercent'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useSwapSettings } from '../Settings'

export const useSwapTransaction = (
  _trade: Trade<Currency, Currency, TradeType>,
  recipient: string,
  { onSuccess }: { onSuccess?: (tx: TransactionResponse) => void },
  permit?: UsePermiReturn,
) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const settings = useSwapSettings((s) => ({
    deadline: s.settings.deadline,
    slippageTolerance: s.settings.slippageTolerance,
  }))

  /*
    temporary workaround for unknow issue with swapTokenForExactToken
    all trades are submited as exact input for now
  */
  const trade = useMemo(() => {
    if (!_trade?.route) return
    try {
      return new Trade(_trade.route, _trade.inputAmount, TradeType.EXACT_INPUT)
    } catch {
      return undefined
    }
  }, [_trade])
  const swapParams = useMemo(() => {
    const { signedPermit } = permit
    if (trade && address)
      return Router.swapCallParameters(trade, {
        allowedSlippage: toPercent(settings.slippageTolerance),
        ttl: settings.deadline * 60,
        feeOnTransfer: trade.tradeType === TradeType.EXACT_INPUT,
        recipient: isAddress(recipient) ? recipient : address,
        signature: signedPermit,
        deadline: signedPermit?.deadline || signedPermit?.expiry,
      })
  }, [permit, trade, address, settings.slippageTolerance, settings.deadline, recipient])

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

  return useMemo(() => ({ trade, ...rest }), [trade, rest])
}
