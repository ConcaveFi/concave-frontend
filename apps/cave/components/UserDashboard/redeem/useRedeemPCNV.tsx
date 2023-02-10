import { PCNVContract, Token } from '@concave/core'
import { isAddress } from 'ethers/lib/utils.js'
import { UseTransaction, useTransaction } from 'hooks/useTransaction'
import { compactFormat } from 'utils/bigNumberMask'
import { useProvider, useSigner } from 'wagmi'
import { RedeemFields } from './useRedeemFields'

export const useRedeemPCNV = <TOut extends Token, TIn extends Token>({
  amountIn,
  address,
  to,
}: RedeemFields<TOut, TIn>) => {
  const provider = useProvider()
  const signer = useSigner()
  const redeemMax = false

  const redeemTransaction = useTransaction(
    async () => {
      const contract = new PCNVContract(provider)
      return contract.redeem(
        signer.data,
        amountIn.quotient.toString(),
        address,
        isAddress(to) ? to : address,
        redeemMax,
      )
    },
    {
      meta: {
        type: 'redeem',
        amount: `${compactFormat(amountIn.quotient.toString())} pCNV`,
      },
    },
  )

  return redeemTransaction satisfies UseTransaction
}
