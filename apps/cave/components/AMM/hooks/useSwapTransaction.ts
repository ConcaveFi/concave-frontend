import { useMemo, useState } from 'react'
import { SwapSettings } from '../Settings'
import { RouterABI, ROUTER_ADDRESS, Router, Currency, TradeType, Trade } from 'gemswap-sdk'
import { Contract } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useContract, useSigner } from 'wagmi'
import { useQuery } from 'react-query'
import { formatUnits } from 'ethers/lib/utils'

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

  const callParameters = useMemo(() => {
    if (!trade || !recipient || !trade.route) return
    return Router.swapCallParameters(trade, {
      allowedSlippage: settings.slippageTolerance.percent,
      ttl: +settings.deadline * 60,
      feeOnTransfer: trade.tradeType === TradeType.EXACT_INPUT,
      recipient,
    })
  }, [recipient, settings.slippageTolerance, settings.deadline, trade])

  /*
    gas estimation can fail when for between other reasons 
    the user don't have a balance or has not approved the input token yet
  */
  // const {
  //   data: estimatedGasFee,
  //   isLoading: isEstimatingGas,
  //   error: errorEstimatingGas,
  // } = useQuery(
  //   ['swap estimated gas fee', callParameters],
  //   () => {
  //     const { methodName, args, value } = callParameters
  //     return routerContract.estimateGas[methodName](...args, { value }).then((estimatedGasFee) =>
  //       formatUnits(estimatedGasFee, 'wei'),
  //     )
  //   },
  //   {
  //     enabled: !!callParameters && !!routerContract.signer,
  //     retry: false,
  //     onError: (e) => console.log(e),
  //     onSuccess: (d) => console.log(d),
  //   },
  // )

  const [state, setState] = useState({
    isWaitingForConfirmation: false,
    isError: false,
    error: undefined,
    isTransactionSent: false,
    data: undefined,
    trade,
  })
  const submit = async () => {
    setState((s) => ({
      ...s,
      trade, // locks the tx trade
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
