import { CNV, CurrencyAmount, PCNV, PCNV_ADDRESS, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useRedeemPCNV } from 'components/UserDashboard/redeem/useRedeemPCNV'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RedeemCard } from './RedeemCard'
import { useRedeemable } from './useRedeemable'
import { useAccount } from 'wagmi'

export const useRedeemPCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const tokenOut = PCNV[chainId]
  const { data: redeemStatus } = useRedeemable({
    address,
    contract: PCNV_ADDRESS[chainId],
    token: PCNV[chainId],
  })
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
