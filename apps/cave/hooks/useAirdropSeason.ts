import {
  getAirdropQ4ClaimableAmount,
  getQ4Proof,
  isWhitelistedQ4,
} from 'components/Airdrop/Q4/airdrop'
import {
  getAirdropSpecialClaimableAmount,
  getSpecialProof,
  isWhitelistedSpecial,
} from 'components/Airdrop/special/airdrop'
import { useAccount } from 'wagmi'

export type AirdropSeason = 'Q4' | 'special'

export function useAirdropSeason(type: AirdropSeason) {
  const { address } = useAccount()
  if (type === 'special') {
    const proof = getSpecialProof(address)
    const whiteListed = isWhitelistedSpecial(address)
    const redeemable = getAirdropSpecialClaimableAmount(address)
    return { proof, whiteListed, redeemable }
  } else {
    const proof = getQ4Proof(address)
    const whiteListed = isWhitelistedQ4(address)
    const redeemable = getAirdropQ4ClaimableAmount(address)
    return { proof, whiteListed, redeemable }
  }
}

export type AidropSeasonProps = {
  proof: string[]
  whiteListed: boolean
  redeemable: any
}
