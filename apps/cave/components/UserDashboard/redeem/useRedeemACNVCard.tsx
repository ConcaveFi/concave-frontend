import { ACNV, CNV, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'
import { RedeemCard } from './RedeemCard'
import { useRedeemableACNV } from './useRedeemable'
import { useRedeemACNV } from './useRedeemACNV'

export const useRedeemACNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const { data: redeemStatus } = useRedeemableACNV({ address })
  const redeemFields = useRedeemFields({
    amountOut: redeemStatus.redeemable,
    tokenIn: CNV[chainId],
    immutableAmount: true,
  })

  const redeemMax =
    redeemStatus?.redeemable && redeemFields.amountOut.equalTo(redeemStatus?.redeemable)
  const redeemTransaction = useRedeemACNV({ ...redeemFields })
  return { redeemFields, redeemTransaction, redeemStatus, redeemMax } satisfies RedeemCard<
    Token,
    Token
  >
}
