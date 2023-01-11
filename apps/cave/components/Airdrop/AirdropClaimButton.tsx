import { AirdropClaimContract } from '@concave/core'
import { Button } from '@concave/ui'
import { useAirdrop } from 'contexts/AirdropContext'
import { useErrorModal } from 'contexts/ErrorModal'
import { parseUnits } from 'ethers/lib/utils'
import { AidropSeasonProps, AirdropSeason } from 'hooks/useAirdropSeason'
import { concaveProvider } from 'lib/providers'
import { useQuery } from 'react-query'
import { useAccount, useSigner, useWaitForTransaction } from 'wagmi'
import { useTransaction } from '../../hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from '../../hooks/useCurrentSupportedNetworkId'
import { airdropToken } from './special/airdrop'

interface AirdropClaimButton {
  season: AirdropSeason
}
export function AirdropClaimButton({ season }: AirdropClaimButton) {
  const airdopCtx = useAirdrop()
  const seasonVal: AidropSeasonProps = airdopCtx[season]
  const { proof, redeemable, whiteListed } = seasonVal || {}
  const { address, isConnected } = useAccount()
  const networkId = useCurrentSupportedNetworkId()
  const { data: signer } = useSigner()
  const errorModal = useErrorModal()
  const canRedeem = Boolean(redeemable)

  const { data: claimed } = useQuery(['AirdropClaimContract', networkId], async () => {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId), season)
    return await airdrop.claimed(address)
  })

  console.log(seasonVal)

  async function claimAidrop() {
    const airdrop = new AirdropClaimContract(concaveProvider(networkId), season)
    const convertedAmount = parseUnits(redeemable?.toString() || '0', airdropToken.decimals)
    return airdrop.claim(signer, proof, convertedAmount)
  }
  const meta = { type: 'airdrop', amount: redeemable } as const
  const onError = (e: unknown) =>
    errorModal.onOpen(e, {
      redeemable: redeemable?.toString(),
      proof: JSON.stringify(proof),
    })
  const airdrop = useTransaction(claimAidrop, { meta, onError })
  const { status } = useWaitForTransaction({ chainId: networkId, hash: airdrop?.tx?.hash })

  return (
    <Button
      {...claimButtonProps({ claimed, canRedeem, status, whiteListed })}
      onClick={() => airdrop.sendTx()}
    >
      {getButtonLabel({ claimed, isConnected, whiteListed, status }) || nameBySeason[season]}
    </Button>
  )
}
type StatusProps = {
  status: 'error' | 'success' | 'idle' | 'loading'
  isConnected: boolean
  claimed: boolean
  whiteListed: boolean
}

function getButtonLabel({ claimed, isConnected, whiteListed, status }: StatusProps) {
  if (!isConnected) return 'You are not connected'
  if (status === 'idle') {
    if (claimed) return 'Already claimed'
    if (!whiteListed) return 'Nothing to claim'
    return ''
  }
  if (status === 'error') return 'Ocurred an error'
  if (status === 'success') return 'Airdrop claimed'
}

interface ClaimButtonProps {
  claimed: boolean
  whiteListed: boolean
  status: 'error' | 'success' | 'idle' | 'loading'
  canRedeem: boolean
}
function claimButtonProps({ claimed, canRedeem, status, whiteListed }: ClaimButtonProps) {
  return {
    disabled: claimed || !whiteListed || status === 'loading' || !canRedeem,
    isLoading: status === 'loading',
    shadow: '0px 0px 20px #0006',
    loadingText: 'Claiming...',
    bg: 'stroke.brightGreen',
    position: 'relative',
    h: '50px',
    width: '150px',
    mt: 7,
  } as const
}
const nameBySeason = {
  special: 'Special Airdrop',
  Q4: 'Q4 Airdrop',
}
