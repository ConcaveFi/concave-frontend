import { useMemo, useState } from 'react'
import { SwapSettings } from '../Settings'
import { RouterABI, ROUTER_ADDRESS, Router, Currency, TradeType, Trade } from '@concave/gemswap-sdk'
import { Contract, Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useContract, useSigner } from 'wagmi'
import { isAddress } from 'ethers/lib/utils'

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
  const [{ data: signer }] = useSigner()
  const routerContract = useContract<Contract>({
    addressOrName: ROUTER_ADDRESS[networkId],
    // @ts-ignore
    contractInterface: RouterABI,
    signerOrProvider: signer,
  })

  const callParameters = useMemo(() => {
    if (!trade || !isAddress(recipient) || !trade.route || !+settings.deadline) return
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

  const [state, setState] = useState(initialState)
  const submit = async () => {
    setState({ ...initialState, trade, isWaitingForConfirmation: true })
    try {
      const { methodName, args, value } = callParameters
      const tx = await routerContract[methodName](...args, { value })
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
