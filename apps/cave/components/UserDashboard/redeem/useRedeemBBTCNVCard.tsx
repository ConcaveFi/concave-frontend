import { BBTCNV, CNV, CurrencyAmount, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useRedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RedeemCard } from './RedeemCard'
import { useRedeemBBTCNV } from './useRedeemBBTCNV'

export const useRedeemBBTCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const tokenOut = BBTCNV[chainId]
  const redeemStatus = useRedeemStatus(tokenOut)
  const redeemFields = useRedeemFields({
    amountOut: CurrencyAmount.fromRawAmount(tokenOut, 0),
    tokenIn: CNV[chainId],
  })

  const redeemMax =
    redeemStatus?.redeemable && redeemFields.amountOut.equalTo(redeemStatus?.redeemable)
  const redeemTransaction = useRedeemBBTCNV({ ...redeemFields, redeemMax })
  return { redeemFields, redeemTransaction, redeemStatus, redeemMax } satisfies RedeemCard<
    Token,
    Token
  >
}
