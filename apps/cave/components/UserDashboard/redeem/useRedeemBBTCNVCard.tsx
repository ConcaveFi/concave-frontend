import { BBTCNV, BBTCNV_REDEMPTION_V2, CNV, CurrencyAmount, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'
import { RedeemCard } from './RedeemCard'
import { useRedeemable } from './useRedeemable'
import { useRedeemBBTCNV } from './useRedeemBBTCNV'

export const useRedeemBBTCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()

  const tokenOut = BBTCNV[chainId]
  const { data: redeemStatus } = useRedeemable({
    address,
    contract: BBTCNV_REDEMPTION_V2[chainId],
    token: BBTCNV[chainId],
  })
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
