import { Currency, RouterAbi, ROUTER_ADDRESS } from '@concave/core'
import { Router, Trade, TradeType } from '@concave/gemswap-sdk'
import { SendTransactionResult } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { UsePermiReturn } from 'hooks/usePermit'
import { useMemo } from 'react'
import { toPercent } from 'utils/toPercent'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { useSwapSettings } from '../Settings'

export const useSwapTransaction = (
  _trade: Trade<Currency, Currency, TradeType>,
  recipient: string,
  {
    onSuccess,
    onError,
  }: { onSuccess?: (tx: SendTransactionResult) => void; onError?: (e: Error) => void },
  permit?: UsePermiReturn,
) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const settings = useSwapSettings((s) => ({
    ...s.defaultSettings,
    ...JSON.parse(JSON.stringify(s.settings)),
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

  const { config } = usePrepareContractWrite({
    address: ROUTER_ADDRESS[chain?.id],
    abi: RouterAbi,
    functionName: swapParams?.methodName,
    args: swapParams?.args,
    overrides: { value: swapParams?.value && BigNumber.from(swapParams?.value) },
  })

  const { reset, ...rest } = useContractWrite({
    ...config,
    onSuccess: (tx) => {
      onSuccess?.(tx)
      registerTransaction(tx.hash, {
        type: 'swap',
        amountIn: trade.inputAmount.toString(),
        amountOut: trade.outputAmount.toString(),
      })
    },
    onError: (error) => {
      if (error.name === 'UserRejectedRequestError') reset()
      onError(error)
    },
  })

  return useMemo(() => ({ trade, ...rest }), [trade, rest])
}
