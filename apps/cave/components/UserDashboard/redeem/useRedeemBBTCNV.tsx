import { BBTRedemptionContractV2 } from '@concave/core'
import { useErrorModal } from 'contexts/ErrorModal'
import { isAddress } from 'ethers/lib/utils.js'
import { useTransaction } from 'hooks/useTransaction'
import { compactFormat } from 'utils/bigNumberMask'
import { useAccount, useProvider, useSigner } from 'wagmi'

export const useRedeemBBTCNV = ({ amountOut, to, amountIn, redeemMax }) => {
  const { address } = useAccount()
  const provider = useProvider()
  const signer = useSigner()
  const errorModal = useErrorModal()
  return useTransaction(
    async () => {
      const contract = new BBTRedemptionContractV2(provider)
      return contract.redeem(
        signer.data,
        amountOut.quotient.toString(),
        isAddress(to) ? to : address,
        redeemMax,
      )
    },
    {
      onError: errorModal.onOpen,
      meta: {
        type: 'redeem',
        amount: `${compactFormat(amountIn.quotient.toString())} pCNV`,
      },
    },
  )
}
