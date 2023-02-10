import { ACNVRedeemContract } from '@concave/core'
import { useErrorModal } from 'contexts/ErrorModal'
import { isAddress } from 'ethers/lib/utils.js'
import { useTransaction } from 'hooks/useTransaction'
import { compactFormat } from 'utils/bigNumberMask'
import { useAccount, useProvider, useSigner } from 'wagmi'

export const useRedeemACNV = ({ to, amountIn }) => {
  const { address } = useAccount()
  const provider = useProvider()
  const signer = useSigner()
  const errorModal = useErrorModal()
  return useTransaction(
    async () => {
      const contract = new ACNVRedeemContract(provider)
      return contract.redeem(signer.data, isAddress(to) ? to : address)
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
