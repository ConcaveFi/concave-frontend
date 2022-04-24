import { useMemo, useState } from 'react'
import { SwapSettings } from '../Settings'
import { RouterABI, ROUTER_ADDRESS, Router, Currency, TradeType, Trade } from 'gemswap-sdk'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useContract, useSigner } from 'wagmi'

export const useSwapTransaction = (
  trade: Trade<Currency, Currency, TradeType>,
  settings: SwapSettings,
  recipient: string,
) => {
  const networkId = useCurrentSupportedNetworkId()
  const [{ data: signer }] = useSigner()
  const routerContract = useContract<Contract>({
    addressOrName: ROUTER_ADDRESS[networkId],
    contractInterface: RouterABI,
    signerOrProvider: signer,
  })
  const txTrade = useMemo(
    () => trade && new Trade(trade.route, trade.inputAmount, TradeType.EXACT_INPUT),
    [trade],
  )

  const callParameters = useMemo(() => {
    if (!txTrade || !recipient) return
    return Router.swapCallParameters(txTrade, {
      allowedSlippage: settings.slippageTolerance.percent,
      ttl: +settings.deadline * 60,
      feeOnTransfer: txTrade.tradeType === TradeType.EXACT_INPUT,
      recipient,
    })
  }, [recipient, settings.slippageTolerance, settings.deadline, txTrade])

  // const { data: estimatedGasFee } = useQuery(
  //   ['swap estimated gas fee', callParameters],
  //   () => {
  //     const { methodName, args, value } = callParameters
  //     return routerContract.estimateGas[methodName](...args, { value }).then((estimatedGasFee) =>
  //       formatUnits(estimatedGasFee, 'wei'),
  //     )
  //   },
  //   { enabled: !!callParameters && !!routerContract.signer, retry: false },
  // )a

  const [state, setState] = useState({
    isWaitingForConfirmation: false,
    isError: false,
    isTransactionSent: false,
    data: undefined,
    trade,
  })
  const submit = async () => {
    setState((s) => ({
      ...s,
      trade: txTrade, // locks the tx trade
      isWaitingForConfirmation: true,
    }))
    const { methodName, args, value } = callParameters
    try {
      const tx = await routerContract[methodName](...args, { value })
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
