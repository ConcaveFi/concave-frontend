import {
  getAirdropQ4ClaimableAmount,
  getQ4Proof,
  isWhitelistedQ4,
} from 'components/Airdrop/Q4/airdrop'
import { useAccount } from 'wagmi'

export type AirdropSeason = 'Q4'

export function useAirdropSeason(type?: AirdropSeason) {
  const { address } = useAccount()
  if (type === 'Q4') {
    const proof = getQ4Proof(address)
    const whiteListed = isWhitelistedQ4(address)
    const redeemable = getAirdropQ4ClaimableAmount(address)
    return { proof, whiteListed, redeemable }
  } else {
  }
}

export type AidropSeasonProps = {
  proof: string[]
  whiteListed: boolean
  redeemable: any
}
