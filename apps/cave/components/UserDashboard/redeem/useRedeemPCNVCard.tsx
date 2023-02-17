import { CNV, CurrencyAmount, PCNV, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useRedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { useRedeemPCNV } from 'components/UserDashboard/redeem/useRedeemPCNV'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RedeemCard } from './RedeemCard'

export const useRedeemPCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const tokenOut = PCNV[chainId]
  const redeemStatus = useRedeemStatus(tokenOut)
  const redeemFields = useRedeemFields({
    amountOut: CurrencyAmount.fromRawAmount(tokenOut, 0),
    tokenIn: CNV[chainId],
  })
  const redeemMax =
    redeemStatus?.redeemable && redeemFields.amountOut.equalTo(redeemStatus?.redeemable)
  const redeemTransaction = useRedeemPCNV({ ...redeemFields, redeemMax })
  return { redeemFields, redeemTransaction, redeemStatus, redeemMax } satisfies RedeemCard<
    Token,
    Token
  >
}
