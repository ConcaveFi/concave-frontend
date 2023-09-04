import { BBTCNV, BBTCNV_REDEMPTION_V2, CNV, CurrencyAmount, Token } from '@concave/core'
import { useRedeemFields } from 'components/UserDashboard/redeem/useRedeemFields'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'
import { RedeemCard } from './RedeemCard'
import { useRedeemable } from './useRedeemable'
import { useRedeemBBTCNV } from './useRedeemBBTCNV'
import { useMemo } from 'react'

export const useRedeemBBTCNVCard = () => {
  const chainId = useCurrentSupportedNetworkId()
  const { address } = useAccount()

  const tokenOut = BBTCNV[chainId] || BBTCNV[1]
  const { data: redeemStatusOld } = useRedeemable({
    address,
    contract: "0x7fcc30E97D718864d46a84F13E3Ba111a56123D3", // Contract V1
    token: BBTCNV[chainId],
  })
  
  const { data: redeemStatusNew } = useRedeemable({
    address,
    contract: BBTCNV_REDEMPTION_V2[chainId],
    token: BBTCNV[chainId],
  })

 const redeemStatus = useMemo(() => {
  if(!redeemStatusOld || !redeemStatusNew) return
  return {...redeemStatusNew, redeemed: redeemStatusNew.redeemed.add(redeemStatusOld.redeemed)}
 }, [redeemStatusNew, redeemStatusOld])
  
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
