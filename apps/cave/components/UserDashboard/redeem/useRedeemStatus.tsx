import {
  ACNV,
  BBTCNV,
  BBTCNV_REDEMPTION_V2,
  CurrencyAmount,
  PCNV,
  PCNV_ADDRESS,
  Token,
} from '@concave/core'
import { BigNumber } from '@ethersproject/bignumber'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useAccount } from 'wagmi'
import { useRedeemable, useRedeemableACNV } from './useRedeemable'

export const useRedeemStatus = (token: Token) => {
  const { address } = useAccount()
  const chainId = useCurrentSupportedNetworkId()
  const bbtCnv = useRedeemable({
    address,
    contract: BBTCNV_REDEMPTION_V2[chainId],
    token: BBTCNV[chainId],
  })
  const pcnv = useRedeemable({ address, contract: PCNV_ADDRESS[chainId], token: PCNV[chainId] })
  const acnv = useRedeemableACNV({ address })

  return {
    [BBTCNV[1].address]: bbtCnv,
    [PCNV[1].address]: pcnv,
    [ACNV[1].address]: acnv,
  }[token.address]?.data
}

export type RedeemStatus = {
  redeemable: CurrencyAmount<Token>
  redeemed: CurrencyAmount<Token>
  vestedPercent: BigNumber
}
