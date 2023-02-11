import { ACNV, CNV, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useRedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { useRedeemPCNV } from 'components/UserDashboard/redeem/useRedeemPCNV'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RedeemCard } from './RedeemCard'

export const useRedeemACNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const tokenOut = ACNV[chainId]
  const redeemStatus = useRedeemStatus(tokenOut)
  const redeemFields = useRedeemFields({
    amountOut: redeemStatus.redeemable,
    tokenIn: CNV[chainId],
    immutableAmount: true,
  })
  const redeemTransaction = useRedeemPCNV({ ...redeemFields })
  return { redeemFields, redeemTransaction, redeemStatus } satisfies RedeemCard<Token, Token>
}
