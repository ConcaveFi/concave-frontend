import { BBTCNV, CNV, CurrencyAmount, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useRedeemStatus } from 'components/UserDashboard/redeem/useRedeemStatus'
import { useRedeemPCNV } from 'components/UserDashboard/redeem/useRedeemPCNV'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RedeemCard } from './RedeemCard'

export const useRedeemBBTCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const tokenOut = BBTCNV[chainId]
  const redeemStatus = useRedeemStatus(tokenOut)
  const redeemFields = useRedeemFields({
    amountOut: CurrencyAmount.fromRawAmount(tokenOut, 0),
    tokenIn: CNV[chainId],
  })
  const redeemTransaction = useRedeemPCNV({ ...redeemFields })
  return { redeemFields, redeemTransaction, redeemStatus } satisfies RedeemCard<Token, Token>
}
